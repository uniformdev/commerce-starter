export const getImageUrl = (image?: string | Types.CloudinaryImage) => {
  const imageUrl = typeof image === 'string' ? image : image?.[0]?.url;

  if (!imageUrl || imageUrl === 'unresolved') return '';

  if (imageUrl.startsWith('//')) return imageUrl.replace('//', 'https://');

  return imageUrl;
};

export const camelize = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
    .replace(/\s+/g, '');
};

export const fromCamelCaseText = (text?: string) => {
  const result = text?.replace(/([A-Z])/g, ' $1') || '';
  return result.charAt(0).toUpperCase() + result.slice(1);
};
