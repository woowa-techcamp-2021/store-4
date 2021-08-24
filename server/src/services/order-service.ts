import { getCustomRepository } from 'typeorm';
import ProductNotfoundException from '../exceptions/product-notfound-exception';
import UserNotfoundException from '../exceptions/user-notfound-exception';
import Order from '../models/order';
import Product from '../models/product';
import OrderDetailRepository from '../repositories/order-detail-repository';
import OrderRepository from '../repositories/order-repository';
import ProductOptionRepository from '../repositories/product-option-repository';
import ProductRepository from '../repositories/product-repository';
import UserRepository from '../repositories/user-repository';
import { isNone } from '../util/type-guard';
import OrderCreate from '../validations/order-create';

const ERROR_MESSAGES = {
  USER_NOTFOUND: '회원이 존재하지 않습니다.',
  PRODUCT_NOTFOUND: '해당 상품이 없습니다',
};

type OrderDetailLike = {
  discountRate: number;
  quantity: number;
  price: number;
  option: string;
  product: Product;
};

class OrderService {
  async findByUser(userId: number): Promise<Order[]> {
    const orders = await getCustomRepository(OrderRepository).findWithOrderDetails(userId);

    return orders;
  }

  async createOrder(userId: number, orderCreate: OrderCreate): Promise<void> {
    const { address, recipientName } = orderCreate;
    const orderDetails: OrderDetailLike[] = [];

    const user = await getCustomRepository(UserRepository).findOne(userId);
    if (isNone(user)) {
      throw new UserNotfoundException(ERROR_MESSAGES.USER_NOTFOUND);
    }

    let totalPrice = 0;
    for (const orderDetail of orderCreate.orderDetails) {
      const { optionIds, productId, quantity } = orderDetail;
      const options = await Promise.all(
        optionIds.map((id) => getCustomRepository(ProductOptionRepository).findOne(id))
      );
      const product = await getCustomRepository(ProductRepository).findOne(productId);
      if (product === undefined) {
        throw new ProductNotfoundException(ERROR_MESSAGES.PRODUCT_NOTFOUND);
      }

      const productPrice = product.price * (1 - product.discountRate);
      const additionalPrice = options.reduce(
        (acc, option) => acc + (Number(option?.additionalPrice) ?? 0),
        0
      );

      const orderDetailPrice = productPrice + additionalPrice;
      orderDetails.push({
        product,
        discountRate: product.discountRate,
        quantity,
        price: orderDetailPrice,
        option: options.map((option) => option?.name ?? '').join('_'),
      });

      totalPrice += orderDetailPrice * quantity;
    }

    const order = await getCustomRepository(OrderRepository).save({
      address,
      recipientName,
      totalPrice,
      user,
    });

    await Promise.all(
      orderDetails.map((orderDetail) =>
        getCustomRepository(OrderDetailRepository).save({
          ...orderDetail,
          order,
        })
      )
    );
  }
}

export default new OrderService();
