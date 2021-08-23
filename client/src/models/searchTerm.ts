import formatDate from '../utils/formatDate';

class SearchTerm {
  content: string;
  createdAt: Date;
  constructor(searchTerm: SearchTerm) {
    this.content = searchTerm.content;
    this.createdAt = new Date(searchTerm.createdAt);
  }

  get date(): string {
    return formatDate(this.createdAt);
  }
}

export default SearchTerm;
