import { getCustomRepository } from 'typeorm';
import OrderRepository from '../repositories/order-repository';

type OrderData = {
  totalPrice: number;
  address: string;
  recipientName: string;
};

export const insertDummyOrderData = async (): Promise<void> => {
  const orderRepository = getCustomRepository(OrderRepository);

  const orders = orderRepository.create(
    data.map(({ totalPrice, address, recipientName }) => ({
      totalPrice,
      address,
      recipientName,
    }))
  );

  await orderRepository.save(orders);
};

const data: OrderData[] = [
  {
    totalPrice: 30000,
    address: '서울',
    recipientName: '김',
  },
  {
    totalPrice: 10000,
    address: '경기',
    recipientName: '이',
  },
  {
    totalPrice: 20000,
    address: '부산',
    recipientName: '박',
  },
];
