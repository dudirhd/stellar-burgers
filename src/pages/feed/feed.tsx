import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedThunk,
  selectLoadFeed,
  selectOrdersFeed
} from '../../services/slices/feedSlice/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrdersFeed);
  const feedRequest = useSelector(selectLoadFeed);

  useEffect(() => {
    dispatch(getFeedThunk());
  }, []);

  if (!orders.length || feedRequest) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedThunk());
      }}
    />
  );
};
