import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import {
  toggleModal,
  getGoogleUserAction,
  setActiveModalComponent,
} from '../store/actions/actions';

import UserInfo from './userInfo/UserInfo';
import { RootState } from '../store/reducers';
import { ActiveModalComponent } from '../store/types/main.types';

const Navbar: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.user);
  const location = useLocation();
  const history = useHistory();
  const loginGoogleUser = async () => {
    const { search } = location;
    if (search) {
      await dispatch(getGoogleUserAction(search));
      history.push('/');
    }
  };
  const handleLogin = () => {
    dispatch(setActiveModalComponent(ActiveModalComponent.SIGNUP));
    dispatch(toggleModal());
  };
  useEffect(() => {
    loginGoogleUser();
  }, []);
  return (
    <nav className="nav">
      <div className="container-lg flex">
        <Link to="/" className="logo">
          <img src={logo} alt="bazar" />
        </Link>
        <form className="search-form">
          <div className="form-control search-from-control">
            <input
              type="text"
              className="input nav-input"
              placeholder="Search your products from here"
            />
            <button className="search-btn" type="submit" />
          </div>
        </form>
        <div className="login-group">
          {!user?.username ? (
            <button
              className="btn auth-btn"
              type="button"
              onClick={handleLogin}
            >
              Join
            </button>
          ) : (
            <UserInfo />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
