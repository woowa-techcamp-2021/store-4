import request from '../lib/request';
import { Option } from '../types/option';
import { ProductDetailResponse, ProductResponse } from '../types/product';
import buildQueryString from '../utils/build-query-string';

class ProductAPI {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  fetchProducts(option: Option): Promise<ProductResponse> {
    const query = buildQueryString(option);
    return request<ProductResponse>({ url: `${this.baseURL}/api/product${query}` });
  }

  fetchProduct(id: number): Promise<ProductDetailResponse> {
    return request<ProductDetailResponse>({ url: `${this.baseURL}/api/product/${id}` });
  }
}

export default ProductAPI;
