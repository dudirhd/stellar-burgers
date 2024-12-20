import { TOrder } from '@utils-types';

export interface IOrderState {
  isLoading: boolean;
  order: TOrder | null;
}
