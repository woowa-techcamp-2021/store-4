export default <T>(arr: T[], itemsPerPage: number, currentPage: number): T[] => {
  if (arr.length === 0) return arr.slice();

  const totalPages = Math.ceil(arr.length / itemsPerPage);
  if (currentPage > totalPages) throw new Error('Page Overflow');

  return arr.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
};
