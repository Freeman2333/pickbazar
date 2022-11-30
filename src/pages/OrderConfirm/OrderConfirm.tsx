import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import { totalSelector } from '../../store/selectors';

import './OrderConfirm.sass';
import { RootState } from '../../store/reducers';
/* eslint max-len: ["error", { "code": 180 }] */

const OrderConfirm: FC = () => {
  const { orderDetails } = useSelector((state: RootState) => state.checkout);
  const subTotal: number = useSelector(totalSelector);
  const date: string | undefined = useSelector(
    (state: RootState) => state.checkout.orderDetails?.created_at,
  );
  const dateToFormat: Date | null = date ? new Date(date) : null;
  return (
    <>
      <div className="order-page">
        <div className="order-container">
          <h2 className="large-title order-title">Order Received</h2>
          <span className="order-thanks">
            Thank you. Your order has been received
          </span>
          <div className="order-top">
            <div className="order-top__item">
              <h3 className="small-title">Order Number</h3>
              <span className="order-top_item-val">{orderDetails?.id}</span>
            </div>
            <div className="order-top__item">
              <h3 className="small-title">Date</h3>
              <span className="order-top_item-val">
                {dateToFormat && <Moment format="ll">{dateToFormat!}</Moment>}
              </span>
            </div>
            <div className="order-top__item">
              <h3 className="small-title">Total</h3>
              <span className="order-top_item-val">
                $
                {subTotal}
              </span>
            </div>
            <div className="order-top__item">
              <h3 className="small-title">Payment Method</h3>
              <span className="order-top_item-val">cash</span>
            </div>
          </div>
          <div className="order-block">
            <h2 className="large-title order-title">Order Details</h2>
            <div className="order-block__item">
              <h3 className="small-title">Order Time:</h3>
              <span>
                <Moment format="ll">{dateToFormat!}</Moment>
              </span>
            </div>
            <div className="order-block__item">
              <h3 className="small-title">Delivery Time:</h3>
              <span>{orderDetails?.when}</span>
            </div>
            <div className="order-block__item">
              <h3 className="small-title">Delivery Location:</h3>
              <span>{orderDetails?.address}</span>
            </div>
          </div>
          <div className="order-block">
            <h2 className="large-title order-title">Total Amount:</h2>
            <div className="order-block__item">
              <h3 className="small-title">Sub Total:</h3>
              <span>
                $
                {subTotal}
              </span>
            </div>
            <div className="order-block__item">
              <h3 className="small-title">Payment Method:</h3>
              <span>cash</span>
            </div>
            <div className="order-block__item">
              <h3 className="small-title">Cash on delivery:</h3>
              <span>10</span>
            </div>
            <div className="order-block__item">
              <h3 className="small-title">Total:</h3>
              <span>
                $
                {subTotal + 10}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirm;
