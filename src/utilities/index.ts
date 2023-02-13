export const prepareSearchParams = (searchParam: object) => {
  return Object.entries(searchParam).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value) {
      acc[key] = String(value);
    }
    return acc;
  }, {});
};

export const getFormattedSlug = (slug?: string | string[] | null): string => {
  if (!slug) throw new Error('Composition slug is not provided');
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  return slugString.startsWith('/') ? slugString : `/${slugString}`;
};

export const togglePageScroll = (isHiddenManual?: boolean): void => {
  const html = document.querySelector('html');
  if (!html) return;
  const isHidden = isHiddenManual ?? html.style.overflow === 'hidden';
  html.style.overflow = isHidden ? 'auto' : 'hidden';
};

export const getFormattedLink = (link: string): string => {
  if (!link) return '';
  return link?.startsWith('http') ? link : `https://${link}`;
};
