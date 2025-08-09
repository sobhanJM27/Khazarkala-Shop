export const toUrl = (value?: string): string => {
  if (!value) return '';
  return value.trim().replace(/\s/g, '-');
};
