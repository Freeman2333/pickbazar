import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { baseURL } from '../../api/api';
import closeIcon from '../../assets/closeIcon.svg';
import {
  removeFromCart,
  increaseAmount,
  decreaseAmount,
} from '../../store/actions/actions';
import { ProductInCart } from '../../store/types/main.types';

interface CartItemProps {
  item: ProductInCart;
}

const CartItem: FC<CartItemProps> = ({ item }) => {
  const {
    id, amount, photos, price, name, size,
  }: ProductInCart = item;
  const img: string = baseURL + photos[0].formats.thumbnail.url;
  const dispatch = useDispatch();

  return (
    <div className="cart__item">
      <div className="cart__item-btns">
        <button
          type="button"
          className="cart__item-btn cart__item-btn--plus"
          onClick={() => dispatch(increaseAmount(id))}
        >
          +
        </button>
        <h3 className="cart__item-count">{amount}</h3>
        <button
          type="button"
          className="cart__item-btn cart__item-btn--minus"
          onClick={() => dispatch(decreaseAmount(id))}
        >
          -
        </button>
      </div>
      <div className="cart__item-img">
        <img src={img} alt="product" />
      </div>
      <div className="cart__item-info">
        <h3 className="small-title">{name}</h3>
        <h4 className="price">
          $
          {price}
        </h4>
        <h4 className="gray-title">{`${amount} X ${size}`}</h4>
      </div>
      <div className="cart__item-total">
        <h3 className="small-title">{`$${amount * price}`}</h3>
      </div>
      <button
        type="button"
        onClick={() => dispatch(removeFromCart(id))}
        className="cart__item-close-btn"
      >
        <img src={closeIcon} alt="closeIcon" />
      </button>
    </div>
  );
};

export default CartItem;
