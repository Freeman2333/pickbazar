import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './ProductCard.module.sass';
import { baseURL } from '../../../api/api';
import { ReactComponent as Basket } from '../../../assets/basket.svg';
import { addToCart, increaseAmount } from '../../../store/actions/actions';
import { isInCartSelector } from '../../../store/selectors';
import { Product } from '../../../store/types/main.types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const {
    photos, name, size, finalPrice, price, id,
  } = product;
  const dispatch = useDispatch();
  const isInCart = useSelector(isInCartSelector(id));
  const addToCartHandler = () => {
    if (!isInCart) {
      dispatch(addToCart(product));
    } else {
      dispatch(increaseAmount(id));
    }
  };
  return (
    <div className={classes.product}>
      <Link to={`/product/${id}`} className={classes.hedaer}>
        <img
          src={`${baseURL}${photos[0].url}`}
          alt={`${baseURL}${photos[0].alternativeText}`}
          className={classes.img}
        />
      </Link>
      <Link to={`/product/${id}`} className={classes.body}>
        <h3 className="small-title">{name}</h3>
        <h4 className="gray-title">{size}</h4>
      </Link>
      <div className={classes.footer}>
        <div className={classes.prices}>
          {price !== finalPrice && (
          <h4 className={classes.price}>
            $
            {price}
          </h4>
          )}
          <h4 className="price">
            $
            {finalPrice}
          </h4>
        </div>
        <button
          type="button"
          className="btn btn-product"
          onClick={addToCartHandler}
        >
          <Basket />
          Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
