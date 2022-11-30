import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { toggleCart } from '../../store/actions/actions';
import CartTrigger from './CartTrigger';
import itemsImg from '../../assets/items-green.svg';
import emptyImg from '../../assets/empty-cart.png';
import closeIcon from '../../assets/closeIcon.svg';
import CartItem from './CartItem';
import { totalItemsSelector, totalAmountSelector } from '../../store/selectors';
import { RootState } from '../../store/reducers';
import { CartState } from '../../store/types/main.types';
import { AppDispatch } from '../../store/store';
import { User } from '../../store/types/user.types';

const Cart: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isCartOpen, cart }: CartState = useSelector(
    (state: RootState) => state.cart,
  );
  const totalItems: number = useSelector(totalItemsSelector);

  const totalAmount: number = useSelector(totalAmountSelector);
  const user: User | null = useSelector((store: RootState) => store.user.user);

  return (
    <aside
      className={classNames('cart-wrapper', { 'is-cart-open': isCartOpen })}
    >
      <CartTrigger totalAmount={totalAmount} totalItems={totalItems} />
      <div className="cart">
        <div className="cart__top">
          <div className="cart-items">
            <img src={itemsImg} alt="cart items" className="cart-items__img" />
            <h4 className="cart-items__number">
              {totalItems}
              {' '}
              Items(s)
            </h4>
          </div>
          <button
            type="button"
            className="cart__close-btn"
            onClick={() => dispatch(toggleCart())}
          >
            <img src={closeIcon} alt="close btn" className="cart__top-img" />
          </button>
        </div>
        <div className="cart__body">
          {totalItems === 0 ? (
            <div className="empty-cart">
              <img src={emptyImg} alt="empty" className="empty-img" />
              <span className="empty-text">No products found</span>
            </div>
          ) : (
            <div className="cart__list">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        <div className="cart__footer">
          <Link
            to="/checkout"
            onClick={() => dispatch(toggleCart())}
            className={classNames('bar', {
              disabled: cart.length === 0 || !user,
            })}
          >
            <span>Checkout</span>
            <div className="bar__price">
              $
              {totalAmount}
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Cart;
