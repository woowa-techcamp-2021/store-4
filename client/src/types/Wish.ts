export type Wish = {
  id: number;
  productId: number;
  title: string;
  imgSrc: string;
};

export type WishResponse = {
  id: number;
  product: Product;
};

type Product = {
  id: number;
  name: string;
  price: string;
  productImages: ProductImage[];
};

type ProductImage = {
  id: number;
  url: string;
};
