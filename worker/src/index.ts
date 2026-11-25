import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage, Mailbox } from 'mimetext';

interface Env {
  SEND_EMAIL: SendEmail;
  /** Comma-separated verified Email Routing destinations (secret). */
  RECIPIENTS: string;
  /** Sender address on the Email Routing domain. */
  FROM_ADDRESS: string;
  /** Comma-separated origins allowed to post the form. */
  ALLOWED_ORIGINS: string;
  /** Turnstile secret key (secret). Required: without it every submission is refused. */
  TURNSTILE_SECRET?: string;
}

const LIMITS = { name: 100, email: 254, company: 150, message: 5000 };
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

/** Strip characters that could break or inject email headers. */
const headerSafe = (value: string) => value.replace(/[\r\n"<>]/g, ' ').trim();

/** Collapse line breaks and runs of whitespace in single-line fields. */
const oneLine = (value: string) => value.replace(/\s+/g, ' ').trim();

/** Base64-encode UTF-8 text, wrapped at 76 characters as email requires. */
const toBase64 = (text: string) => {
  let binary = '';
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/.{76}/g, '$&\r\n');
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') ?? '';
    const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
    const cors: Record<string, string> = allowed.includes(origin)
      ? {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          Vary: 'Origin',
        }
      : {};
    const reply = (status: number, body: Record<string, unknown>) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', ...cors },
      });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return reply(405, { ok: false, error: 'Method not allowed.' });
    if (!allowed.includes(origin)) return reply(403, { ok: false, error: 'Origin not allowed.' });

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return reply(400, { ok: false, error: 'Could not read the form.' });
    }
    const field = (key: string) => String(form.get(key) ?? '').trim();

    // Honeypot: real visitors never fill this in. Pretend success so bots move on.
    if (field('website')) return reply(200, { ok: true });

    const name = oneLine(field('name'));
    const email = field('email');
    const company = oneLine(field('company'));
    const message = field('message');

    if (!name || name.length > LIMITS.name) {
      return reply(400, { ok: false, error: 'Please enter your name.' });
    }
    if (!EMAIL_RE.test(email) || email.length > LIMITS.email) {
      return reply(400, { ok: false, error: 'Please enter a valid email address.' });
    }
    if (company.length > LIMITS.company) {
      return reply(400, { ok: false, error: 'Company name is too long.' });
    }
    if (message.length < 10 || message.length > LIMITS.message) {
      return reply(400, { ok: false, error: 'Please write a message of at least 10 characters.' });
    }

    // Fail closed: never accept submissions without the spam check configured.
    if (!env.TURNSTILE_SECRET) {
      return reply(503, { ok: false, error: 'The form is not available right now. Please email us instead.' });
    }
    {
      const check = new FormData();
      check.append('secret', env.TURNSTILE_SECRET);
      check.append('response', field('cf-turnstile-response'));
      const ip = request.headers.get('CF-Connecting-IP');
      if (ip) check.append('remoteip', ip);
      const result = (await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: check,
      }).then((r) => r.json())) as { success?: boolean };
      if (!result.success) {
        return reply(403, { ok: false, error: 'The spam check failed. Please try again.' });
      }
    }

    const recipients = env.RECIPIENTS.split(',')
      .map((r) => r.trim())
      .filter(Boolean);
    const body = [
      'New enquiry from the All Set Partners website.',
      '',
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Company: ${company || '-'}`,
      '',
      message,
      '',
      '---',
      'Reply to this email to answer the sender directly.',
    ].join('\n');

    let delivered = 0;
    for (const to of recipients) {
      try {
        const mime = createMimeMessage();
        mime.setSender({ name: 'All Set Partners website', addr: env.FROM_ADDRESS });
        mime.setRecipient(to);
        mime.setHeader('Reply-To', new Mailbox({ name: headerSafe(name), addr: email }));
        mime.setSubject(`Website enquiry from ${headerSafe(name)}`);
        mime.addMessage({ contentType: 'text/plain', data: toBase64(body), encoding: 'base64' });
        await env.SEND_EMAIL.send(new EmailMessage(env.FROM_ADDRESS, to, mime.asRaw()));
        delivered++;
      } catch (err) {
        console.error(`Could not deliver to recipient ${recipients.indexOf(to) + 1}:`, err);
      }
    }

    if (delivered === 0) {
      return reply(502, { ok: false, error: 'Your message could not be sent. Please email us instead.' });
    }
    return reply(200, { ok: true });
  },
};
