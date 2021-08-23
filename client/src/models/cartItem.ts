class CartItem {
  id: number;
  title: string;
  imgSrc: string;
  count: number;
  price: number;
  isSelected: boolean;

  constructor(data: CartItem) {
    this.id = data.id;
    this.title = data.title;
    this.imgSrc = data.imgSrc;
    this.count = data.count;
    this.price = data.price;
    this.isSelected = data.isSelected;
  }
}

export default CartItem;
