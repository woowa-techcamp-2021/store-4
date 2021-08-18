type QueryObject = { [key: string]: string | number | null };

export default (query: QueryObject): string => {
  const querystring = Object.keys(query)
    .map((key) => `${key}=${query[key] || ''}`)
    .join('&');

  return `?${querystring}`;
};
