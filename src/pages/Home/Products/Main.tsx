import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productLimitPerPage } from '../../../constants';
import { getProducts } from '../../../store/actions/actions';
import { RootState } from '../../../store/reducers';
import classes from './Products.module.sass';
import ProductsList from './ProductsList';

const Main: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const getProductCategoriesParams = useSelector(
    (state: RootState) => state.products.getProductCategoriesParams,
  );
  const [productLimit, setProductLimit] = useState<number>(productLimitPerPage);
  const loadMore = () => setProductLimit(productLimit + productLimitPerPage);
  useEffect(() => {
    dispatch(getProducts({ productLimit, ...getProductCategoriesParams }));
  }, [productLimit, dispatch]);
  return (
    <div className={classes.main}>
      <ProductsList products={products} />
      <div className={classes.btnWrapper}>
        <button type="button" className="btn btn-white" onClick={loadMore}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default Main;
