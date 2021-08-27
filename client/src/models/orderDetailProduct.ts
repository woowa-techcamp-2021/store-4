import { getSelectedOptionPriceList } from '../components/Cart/helper';
import { OrderDetailSummary } from '../types/order';
import { SelectWithSelected } from '../types/product';
import { isNone } from '../utils/typeGuard';

const getSelectedOptionIds = (selectWithSelecteds: SelectWithSelected[] | undefined): number[] => {
  if (isNone(selectWithSelecteds)) {
    return [];
  }

  const optionIds: number[] = [];

  for (const selectWithSelected of selectWithSelecteds) {
    const selectedOption = selectWithSelected.selectedOption;
    if (selectedOption) {
      optionIds.push(selectedOption.id);
    }
  }

  return optionIds;
};

class OrderDetailProductAttributes {
  uuid: string;
  productId: number;
  name: string;
  price: number;
  count: number;
  thumbnail: string;
  selectWithSelecteds?: SelectWithSelected[];

  constructor(orderDetailProduct: OrderDetailProductAttributes) {
    this.uuid = orderDetailProduct.uuid;
    this.productId = orderDetailProduct.productId;
    this.name = orderDetailProduct.name;
    this.price = orderDetailProduct.price;
    this.thumbnail = orderDetailProduct.thumbnail;
    this.count = orderDetailProduct.count;
    this.selectWithSelecteds = orderDetailProduct.selectWithSelecteds;
  }
}

class OrderDetailProduct extends OrderDetailProductAttributes {
  get totalPrice(): number {
    const optionsPrice = getSelectedOptionPriceList(this.selectWithSelecteds).reduce(
      (total, option) => total + option,
      0
    );

    return (this.price + optionsPrice) * this.count;
  }

  get orderDetail(): OrderDetailSummary {
    const { count, productId, selectWithSelecteds } = this;
    const optionIds = getSelectedOptionIds(selectWithSelecteds);

    return {
      quantity: count,
      productId,
      optionIds,
    };
  }
}

export default OrderDetailProduct;
