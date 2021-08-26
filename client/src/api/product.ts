import request from '../lib/request';
import { Option } from '../types/option';
import { MainProductsResponse, ProductDetailResponse, ProductResponse } from '../types/product';
import buildQueryString from '../utils/build-query-string';

class ProductAPI {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  fetchProducts(token: string | null, option: Option): Promise<ProductResponse> {
    const query = buildQueryString(option);
    return request<ProductResponse>({
      url: `${this.baseURL}/api/product${query}`,
      headers: {
        authorization: token ?? '',
      },
    });
  }

  fetchProduct(token: string | null, id: number): Promise<ProductDetailResponse> {
    return request<ProductDetailResponse>({
      url: `${this.baseURL}/api/product/${id}`,
      headers: {
        authorization: token ?? '',
      },
    });
  }

  fetchWishList(token: string | null, userId: number) {
    return request({
      url: `${this.baseURL}/api/product/${userId}/wishList`,
      headers: {
        authorization: token ?? '',
      },
    });
  }

  wish(token: string, id: number): Promise<void> {
    return request<void>({
      url: `${this.baseURL}/api/product/${id}/wish`,
      method: 'POST',
      headers: {
        authorization: token,
      },
    });
  }

  cancelWish(token: string, id: number): Promise<void> {
    return request<void>({
      url: `${this.baseURL}/api/product/${id}/wish`,
      method: 'DELETE',
      headers: {
        authorization: token,
      },
    });
  }

  fetchMainProducts(token: string | null): Promise<MainProductsResponse> {
    return request<MainProductsResponse>({
      url: `${this.baseURL}/api/product/main`,
      headers: {
        authorization: token ?? '',
      },
    });
  }
}

export default ProductAPI;
