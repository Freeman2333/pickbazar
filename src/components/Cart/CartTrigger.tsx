import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleCart } from '../../store/actions/actions';
import itemsImg from '../../assets/items-img.svg';
import { AppDispatch } from '../../store/store';

interface CartTriggerProps {
  totalAmount: number;
  totalItems: number;
}

const CartTrigger: FC<CartTriggerProps> = ({ totalAmount, totalItems }) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div
      className="cart-trigger"
      role="button"
      tabIndex={0}
      onClick={() => dispatch(toggleCart())}
      onKeyDown={() => dispatch(toggleCart())}
    >
      <div className="cart-items">
        <img src={itemsImg} alt="cart items" className="cart-items__img" />
        <h4 className="cart-items__number">
          {totalItems}
          {' '}
          Items(s)
        </h4>
      </div>
      <button type="button" className="btn btn-white">
        $
        {totalAmount}
      </button>
    </div>
  );
};

CartTrigger.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export default CartTrigger;
