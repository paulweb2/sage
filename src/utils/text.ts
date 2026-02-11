export const ensureSentenceEnding = (value: string): string => {
  const trimmed = value.trim();

  if (!trimmed) {
    return value;
  }

  if (/[.!?…]$/.test(trimmed)) {
    return value;
  }

  return `${trimmed}.`;
};
