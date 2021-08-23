class SearchTerm {
  content: string;
  createdAt: Date;
  constructor(searchTerm: SearchTerm) {
    this.content = searchTerm.content;
    this.createdAt = new Date(searchTerm.createdAt);
  }
}

export default SearchTerm;
