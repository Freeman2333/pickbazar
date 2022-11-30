import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { setOrderTime } from '../../store/actions/actions';
import { CheckoutState, ScheduleItem } from '../../store/types/checkout.types';
import { RootState } from '../../store/reducers';
/* eslint max-len: ["error", { "code": 180 }] */
interface CheckoutScheduleProps {
  schedules: ScheduleItem[];
}

const CheckoutSchedule: FC<CheckoutScheduleProps> = ({ schedules }) => {
  const dispatch = useDispatch();
  const { orderTime }: CheckoutState = useSelector(
    (state: RootState) => state.checkout,
  );
  return (
    <div className="checkout-block">
      <div className="checkout-block__top">
        <span className="checkout-block__number">2</span>
        <h3 className="checkout-title">Delivery Schedule</h3>
      </div>
      <div className="checkout-block__items">
        {schedules.map((schedule) => (
          <div
            className={classNames('checkout-block__item', {
              active: orderTime?.title === schedule.title,
            })}
            role="button"
            tabIndex={0}
            onClick={() => dispatch(setOrderTime(schedule))}
            onKeyDown={() => dispatch(setOrderTime(schedule))}
            key={schedule.id}
          >
            <h3 className="small-title">{schedule.title}</h3>
            <p className="checkout-block__item-text">{schedule.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSchedule;
