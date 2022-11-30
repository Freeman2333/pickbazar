import React, { MouseEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Checkout.sass';
import classNames from 'classnames';
import closeIcon from '../../assets/closeIcon.svg';
import editIcon from '../../assets/editIcon.svg';
import { CheckoutState, INumber } from '../../store/types/checkout.types';
import {
  deleteNumber,
  setOrderNumber,
  setIsEditingNumber,
  toggleModal,
  setActiveModalComponent,
  setNumber,
} from '../../store/actions/actions';
import { RootState } from '../../store/reducers';
import { AppDispatch } from '../../store/store';
import { ActiveModalComponent } from '../../store/types/main.types';
/* eslint max-len: ["error", { "code": 180 }] */
export interface ICheckoutNumbersProps {
  numbers: INumber[];
}

const CheckoutNumbers: FC<ICheckoutNumbersProps> = ({ numbers }) => {
  const { orderNumber }: CheckoutState = useSelector(
    (state: RootState) => state.checkout,
  );
  const dispatch: AppDispatch = useDispatch();
  const editNumber = (number: INumber): void => {
    dispatch(toggleModal());
    dispatch(setActiveModalComponent(ActiveModalComponent.ADD_NUMBERS_FORM));
    dispatch(setIsEditingNumber(true));
    dispatch(setNumber(number.id));
  };
  const deleteNumberClick = (number: INumber) => (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteNumber(number.id));
    dispatch(setOrderNumber(null));
  };
  const addNumber = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    dispatch(toggleModal());
    dispatch(setActiveModalComponent(ActiveModalComponent.ADD_NUMBERS_FORM));
  };
  return (
    <div className="checkout-block">
      <div className="checkout-block__top">
        <span className="checkout-block__number">3</span>
        <h3 className="checkout-title">Contact Number</h3>
        <a href="/" onClick={addNumber} className="checkout-block__add">
          + Add Number
        </a>
      </div>
      <div className="checkout-block__items">
        {numbers.map((number) => (
          <div
            role="button"
            tabIndex={0}
            className={classNames('checkout-block__item', {
              active: orderNumber === number,
            })}
            onClick={() => dispatch(setOrderNumber(number))}
            onKeyDown={() => dispatch(setOrderNumber(number))}
            key={number.id}
          >
            <div className="checkout-block__btns">
              <button
                type="button"
                onClick={() => editNumber(number)}
                className="checkout-block__btn checkout-block__btn-edit"
              >
                <img src={editIcon} alt="edit icon" />
              </button>
              <button
                type="button"
                onClick={(e) => deleteNumberClick(number)}
                className="checkout-block__btn checkout-block__btn-close"
              >
                <img src={closeIcon} alt="close icon" />
              </button>
            </div>
            <h3 className="small-title">{number.number}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutNumbers;
