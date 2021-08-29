import request from '../lib/request';
import { CategoryResponse } from '../types/category';

class CategoryAPI {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  fetchCategories(): Promise<CategoryResponse> {
    return request<CategoryResponse>({ url: `${this.baseURL}/api/category` });
  }
}

export default CategoryAPI;
