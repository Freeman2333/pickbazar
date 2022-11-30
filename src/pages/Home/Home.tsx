import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import Coupons from './Coupons';
import Hero from './Hero';
import Products from './Products/Products';

const Home: FC = () => (
  <section className="home-page">
    <ToastContainer autoClose={2500} position="top-right" closeButton={false} />
    <Hero />
    <Coupons />
    <Products />
  </section>
);

export default Home;
