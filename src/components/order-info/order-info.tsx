import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrderByNumberThunk,
  resetOrder
} from '../../services/slices/orderSlice/orderSlice';
import { selectIngredients } from '../../services/slices/ingredientsSlice/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { selectOrderByNumber } from '../../services/selectors';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const number = useParams().number || '';
  const orderData = useSelector(selectOrderByNumber(number));
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrderByNumberThunk(+number));
    }
  }, [dispatch, orderData, number]);

  /* готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce<TIngredientsWithCount>(
      (acc, item) => {
        const existing = acc[item];
        if (existing) {
          existing.count++;
        } else {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = { ...ingredient, count: 1 };
          }
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc: any, item: any) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
