import React, { FC } from 'react';
import classes from './Products.module.sass';
import ProductCard from '../../../components/userInfo/ProductCard/ProductCard';
import { Product } from '../../../store/types/main.types';

interface ProductList {
  products: Product[];
}

const ProductsList: FC<ProductList> = ({ products }) => (
  <div className={classes.productWrapper}>
    {products.map((prd: Product) => (
      <ProductCard key={prd.id} product={prd} />
    ))}
  </div>
);

export default ProductsList;
