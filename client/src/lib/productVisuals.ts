export function cardImages(
  handle: string,
  images: string[],
  overrides: Record<string, string[]>,
  fallbacks: string[]
) {
  const override = overrides[handle];
  if (override?.length) return override;
  if (images.length > 1) return images;
  return [...images, ...fallbacks].slice(0, 2);
}
