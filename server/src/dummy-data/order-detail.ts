import { getCustomRepository } from 'typeorm';
import OrderRepository from '../repositories/order-repository';
import ProductRepository from '../repositories/product-repository';
import OrderDetailRepository from '../repositories/order-detail-repository';

type OrderDetailData = {
  price: number;
  quantity: number;
  option: string;
  orderId: number;
  productId: number;
};

export const insertDummyOptionDetailData = async (): Promise<void> => {
  const orders = await Promise.all(
    data.map(({ orderId }) => getCustomRepository(OrderRepository).findOne(orderId))
  );

  const products = await Promise.all(
    data.map(({ productId }) => getCustomRepository(ProductRepository).findOne(productId))
  );

  const orderDetailRepository = getCustomRepository(OrderDetailRepository);

  const orderDetails = orderDetailRepository.create(
    data.map((orderDetail, index) => ({
      price: orderDetail.price,
      quantity: orderDetail.quantity,
      option: orderDetail.option,
      order: orders[index],
      product: products[index],
    }))
  );

  await orderDetailRepository.save(orderDetails);
};

const data: OrderDetailData[] = [
  {
    price: 3000,
    quantity: 2,
    option: '옵션 1',
    orderId: 1,
    productId: 1,
  },
  {
    price: 3500,
    quantity: 1,
    option: '옵션 1',
    orderId: 1,
    productId: 2,
  },
  {
    price: 7500,
    quantity: 3,
    option: '옵션 1',
    orderId: 1,
    productId: 3,
  },
  {
    price: 1500,
    quantity: 1,
    option: '옵션 1',
    orderId: 2,
    productId: 1,
  },
  {
    price: 3500,
    quantity: 1,
    option: '옵션 1',
    orderId: 2,
    productId: 2,
  },
  {
    price: 10000,
    quantity: 4,
    option: '옵션 1',
    orderId: 2,
    productId: 3,
  },
  {
    price: 7500,
    quantity: 5,
    option: '옵션 1',
    orderId: 3,
    productId: 1,
  },
];
