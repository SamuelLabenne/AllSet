import type { ImageMetadata } from 'astro';

// Every photo in src/assets/photos, looked up by file name without extension.
const photos = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/photos/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

export function findPhoto(name: string): ImageMetadata | undefined {
  const match = Object.entries(photos).find(([path]) =>
    new RegExp(`/${name}\\.(jpe?g|png|webp)$`, 'i').test(path),
  );
  return match?.[1].default;
}
