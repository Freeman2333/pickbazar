import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Product.module.sass';
import {
  getProduct,
  addToCart,
  increaseAmount,
  unselectProduct,
} from '../../store/actions/actions';
import { baseURL } from '../../api/api';
import { ReactComponent as Basket } from '../../assets/basket.svg';
import ProductsList from '../Home/Products/ProductsList';
import { RootState } from '../../store/reducers';

interface ProductParams {
  id: string;
}

const Product: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<ProductParams>();
  const product = useSelector((state: RootState) => state.products.product);
  const { cart } = useSelector((state: RootState) => state.cart);
  const isInCart = !!cart.find((item) => item.id === id);
  const isProductLoading = useSelector(
    (state: RootState) => state.products.isProductLoading,
  );
  const products = useSelector((state: RootState) => state.products.products);
  const [mainImgIndex, setMainImgIndex] = useState<number>(0);
  useEffect(() => {
    dispatch(getProduct(id));
    return () => {
      dispatch(unselectProduct());
    };
  }, [dispatch, id]);

  if (isProductLoading || !product) {
    return <>Loading...</>;
  }
  const { photos } = product;

  const addToCartHandler = () => {
    if (!isInCart) {
      dispatch(addToCart(product));
    } else {
      dispatch(increaseAmount(id));
    }
  };
  return (
    <div className={classes.productPage}>
      <div className="container-lg">
        <section className={classes.product}>
          <div className={classes.productLeft}>
            <div className={classes.productHeader}>
              <img
                src={baseURL + photos[mainImgIndex].url}
                alt="mainImg"
                className={classes.mainImg}
              />
            </div>
            <div className={classes.productGallery}>
              {photos.map((img, idx) => (
                <div
                  key={img}
                  role="button"
                  tabIndex={0}
                  className={classNames(classes.galleryItem, {
                    active: idx === mainImgIndex,
                  })}
                  onClick={() => setMainImgIndex(idx)}
                  onKeyDown={() => setMainImgIndex(idx)}
                >
                  <img
                    src={baseURL + img.formats.thumbnail.url}
                    alt="product"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={classes.productRight}>
            <div className={classes.infoLine}>
              <h3 className="large-title">{product.name}</h3>
              <h3 className="price">
                $
                {product.price}
              </h3>
            </div>
            <h4 className="gray-title">{product.size}</h4>
            <p className={classes.descr}>{product.description}</p>
            <div className={classes.btnWrapper}>
              <button
                type="button"
                className="btn btn-product"
                onClick={addToCartHandler}
              >
                <Basket />
                Cart
              </button>
            </div>
            <div className={classes.tagsWrapper}>
              <a href="/" className="btn btn-tag">
                {product.category.title}
              </a>
              {product.category.parrentCategory && (
                <a href="/cp" className="btn btn-tag">
                  {product.category.parrentCategory.title}
                </a>
              )}
            </div>
          </div>
        </section>
        <section className={classes.productList}>
          <ProductsList products={products} />
        </section>
      </div>
    </div>
  );
};

export default Product;
