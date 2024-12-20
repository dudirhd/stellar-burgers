import { RootState } from '../store';

export const selectOrderByNumber = (number: string) => (state: RootState) => {
  const orderNumber = +number;

  const allOrdersOrder = state.allOrders.orders.find(
    (item) => item.number === orderNumber
  );
  if (allOrdersOrder) return allOrdersOrder;

  const feedOrder = state.feed.feed.orders.find(
    (item) => item.number === orderNumber
  );
  if (feedOrder) return feedOrder;

  if (state.order.order?.number === orderNumber) {
    return state.order.order;
  }

  return null;
};

export const selectConstructorItems = (state: RootState) => state.constructor;
