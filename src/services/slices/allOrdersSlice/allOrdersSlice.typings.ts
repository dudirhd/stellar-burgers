import { TOrder } from '@utils-types';

export interface IAllOrdersState {
  isLoading: boolean;
  orders: TOrder[];
}
