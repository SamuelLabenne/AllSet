const dateFormat = new Intl.DateTimeFormat('en-AU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Australia/Sydney',
});

export const formatDate = (date: Date) => dateFormat.format(date);

/** Rough reading time in minutes for a Markdown body. */
export const readingTime = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 220));
