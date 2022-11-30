import React, { FC, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Checkout.sass';
import classNames from 'classnames';
import closeIcon from '../../assets/closeIcon.svg';
import editIcon from '../../assets/editIcon.svg';
import {
  deleteAdress,
  setOrderAdress,
  setIsEditingAdress,
  setAdress,
  setActiveModalComponent,
  toggleModal,
} from '../../store/actions/actions';
import { Adress } from '../../store/types/checkout.types';
import { RootState } from '../../store/reducers';
import { ActiveModalComponent } from '../../store/types/main.types';

export interface ICheckoutAdressesProps {
  adresses: Adress[];
}

const CheckoutAdresses: FC<ICheckoutAdressesProps> = ({ adresses }) => {
  const orderAdress: Adress | null = useSelector(
    (state: RootState) => state.checkout.orderAdress,
  );
  const dispatch = useDispatch();
  const editAdress = (adress: Adress) => {
    dispatch(toggleModal());
    dispatch(setActiveModalComponent(ActiveModalComponent.ADD_ADRESS_FORM));
    dispatch(setIsEditingAdress(true));
    dispatch(setAdress(adress.id));
  };
  const deleteAdressClick = (id: string) => (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteAdress(id));
    dispatch(setOrderAdress(null));
  };
  const addAdress = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(toggleModal());
    dispatch(setActiveModalComponent(ActiveModalComponent.ADD_ADRESS_FORM));
  };
  return (
    <div className="checkout-block">
      <div className="checkout-block__top">
        <span className="checkout-block__number">1</span>
        <h3 className="checkout-title">Delivery Address</h3>
        <a href="/" onClick={addAdress} className="checkout-block__add">
          +Add Adress
        </a>
      </div>
      <div className="checkout-block__items">
        {adresses.map((adrs) => (
          <div
            role="button"
            tabIndex={0}
            className={classNames('checkout-block__item', {
              active: orderAdress?.title === adrs.title,
            })}
            onClick={() => dispatch(setOrderAdress(adrs))}
            onKeyDown={() => dispatch(setOrderAdress(adrs))}
            key={adrs.id}
          >
            <div className="checkout-block__btns">
              <button
                type="button"
                onClick={() => editAdress(adrs)}
                className="checkout-block__btn checkout-block__btn-edit"
              >
                <img src={editIcon} alt="edit icon" />
              </button>
              <button
                type="button"
                onClick={deleteAdressClick(adrs.id)}
                className="checkout-block__btn checkout-block__btn-close"
              >
                <img src={closeIcon} alt="close icon" />
              </button>
            </div>
            <h3 className="small-title">{adrs.title}</h3>
            <p className="checkout-block__item-text">{adrs.adress}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutAdresses;
