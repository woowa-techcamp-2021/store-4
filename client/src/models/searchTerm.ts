import formatDate from '../utils/formatDate';

class SearchTermAttributes {
  content: string;
  createdAt: Date;

  constructor(searchTerm: SearchTermAttributes) {
    this.content = searchTerm.content;
    this.createdAt = new Date(searchTerm.createdAt);
  }
}

class SearchTerm extends SearchTermAttributes {
  get date(): string {
    return formatDate(this.createdAt);
  }
}

export default SearchTerm;
