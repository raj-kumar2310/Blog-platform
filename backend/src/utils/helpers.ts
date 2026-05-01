import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' }
  );
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export const generateExcerpt = (content: string, length = 300): string => {
  // Remove markdown formatting
  let text = content
    .replace(/[*_`#]/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .trim();

  if (text.length > length) {
    text = text.substring(0, length).trim() + '...';
  }

  return text;
};
