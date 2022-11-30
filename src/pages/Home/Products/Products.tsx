import React, { FC } from 'react';
import Sidebar from './Sidebar';
import Main from './Main';
import classes from './Products.module.sass';

const Products: FC = () => (
  <div className={classes.productsSection}>
    <Sidebar />
    <Main />
  </div>
);

export default Products;
