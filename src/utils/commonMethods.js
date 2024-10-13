export const getUniqueTags = data => {
  const tags = new Set();
  data.forEach(item => item.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags);
};
