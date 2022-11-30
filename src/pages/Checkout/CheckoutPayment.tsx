import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postOrder } from '../../store/actions/actions';
import { RootState } from '../../store/reducers';
import {
  Adress,
  INumber,
  OrderDetails,
  ScheduleItem,
} from '../../store/types/checkout.types';
import { ProductInCart } from '../../store/types/main.types';
import { User } from '../../store/types/user.types';

export interface IOrder {
  orderNumber: INumber | null;
  orderAdress: Adress | null;
  orderTime: ScheduleItem | null;
}

export interface IOrderBody {
  address: string;
  when: string;
  products: ProductInCart[];
  phone: string;
  email: string;
}

interface CheckoutPaymentProps {
  paymentType: string[];
  orderDetails: OrderDetails | null;
  order: IOrder;
}

const CheckoutPayment: FC<CheckoutPaymentProps> = ({
  paymentType,
  order,
  orderDetails,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user: User | null = useSelector((state: RootState) => state.user.user);
  const products: ProductInCart[] = useSelector(
    (state: RootState) => state.cart.cart,
  );
  const isLoggedIn: boolean = !!user;
  const { orderNumber, orderAdress, orderTime }: IOrder = order;
  const orderBody: IOrderBody = {
    address: orderAdress?.adress ?? '',
    when: orderTime?.time ?? '',
    products,
    phone: orderNumber?.number ?? '',
    email: user?.email ?? '',
  };

  const checkIfOrderFieldsSelected = () => {
    const orderFieldsKeys = Object.keys(orderBody);
    const orderFieldsSetValues = Object.values(orderBody).filter((n) => n);
    return orderFieldsKeys.length === orderFieldsSetValues.length;
  };

  const checkoutSubmit = () => {
    dispatch(postOrder(orderBody));
    if (orderDetails) {
      history.push('/orderConfirm');
    }
  };
  return (
    <div className="checkout-block">
      <div className="checkout-block__top">
        <span className="checkout-block__number">4</span>
        <h3 className="checkout-title">Payment Option</h3>
      </div>
      <div className="checkout-block__items">
        {paymentType.map((type) => (
          <div key={type} className="checkout-block__item active">
            <h3 className="small-title">{type}</h3>
            <p className="checkout-block__item-text">{type}</p>
          </div>
        ))}
      </div>
      <div className="checkout-submit">
        <h3 className="gray-title">
          By making this purchase you agree to our terms and conditions.
        </h3>
        <button
          type="button"
          onClick={checkoutSubmit}
          disabled={!isLoggedIn || !checkIfOrderFieldsSelected()}
          className="btn checkout-btn"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutPayment;
