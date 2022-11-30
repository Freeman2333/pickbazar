import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Checkout from './pages/Checkout/Checkout';
import Navbar from './components/Navbar';
import Modal from './components/Modal/Modal';
import Cart from './components/Cart/Cart';
import './styles/App.sass';
import OrderConfirm from './pages/OrderConfirm/OrderConfirm';

function App() {
  return (
    <Router>
      <Navbar />
      <Modal />
      <Cart />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/product/:id" component={Product} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orderConfirm" component={OrderConfirm} />
      </Switch>
    </Router>
  );
}

export default App;
