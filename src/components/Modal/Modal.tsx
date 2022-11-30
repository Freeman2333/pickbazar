import React, { FC, MouseEvent } from 'react';
import ReactDom from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import {
  setActiveModalComponent,
  toggleModal,
} from '../../store/actions/actions';
import Signup from './Signup';
import Signin from './Signin';
import AddAdressForm from '../../pages/Checkout/AddAdressForm';
import AddNumberForm from '../../pages/Checkout/AddNumberForm';
import classes from './modal.module.sass';
import closeIcon from '../../assets/closeIcon.svg';
import fbIcon from '../../assets/fb.svg';
import googleIcon from '../../assets/google.svg';
import {
  signup, signin, addAdressForm, addNumberForm,
} from '../../constants';
import { RootState } from '../../store/reducers';
import { ActiveModalComponent } from '../../store/types/main.types';

const Modal: FC = () => {
  const isModalOpen = useSelector((state: RootState) => state.main.isModalOpen);
  const dispatch: Dispatch = useDispatch();
  const activeComponent: ActiveModalComponent = useSelector(
    (state: RootState) => state.main.activeModalComponent,
  );
  const toggleActiveComponent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (activeComponent === signup) dispatch(setActiveModalComponent(ActiveModalComponent.SIGNIN));
    if (activeComponent === signin) dispatch(setActiveModalComponent(ActiveModalComponent.SIGNUP));
  };
  const switchToReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('you have been sent an email with a new password');
  };
  if (!isModalOpen) return null;
  return ReactDom.createPortal(
    <div className={classes.modalOverlay}>
      <div className={classes.modal}>
        <button
          type="button"
          className={classes.closeBtn}
          onClick={() => dispatch(toggleModal())}
        >
          <img src={closeIcon} alt="closeIcon" />
        </button>
        {activeComponent === signup && <Signup />}
        {activeComponent === signin && <Signin />}
        {activeComponent === addAdressForm && <AddAdressForm />}
        {activeComponent === addNumberForm && <AddNumberForm />}
        {(activeComponent === signup || activeComponent === signin) && (
          <>
            <h4 className={classes.modalOr}>or</h4>
            <button type="button" className="btn btn-auth-modal btn-auth-fb">
              <img src={fbIcon} className="auth-icon" alt="closeIcon" />
              Continue with Facebook
            </button>
            <a
              href={`${process.env.REACT_APP_BASE_URL}/connect/google`}
              className="btn btn-auth-modal btn-auth-google"
            >
              <img src={googleIcon} className="auth-icon" alt="closeIcon" />
              Continue With Google
            </a>
            <h3 className={classes.accountChecker}>
              {activeComponent === signup && 'Already have an account?'}
              {activeComponent === signin && 'Don’t have account yet?'}
              <button
                type="button"
                className={classes.accountSwitcher}
                onClick={toggleActiveComponent}
              >
                {activeComponent === signup && 'Login'}
                {activeComponent === signin && 'Sign Up'}
              </button>
            </h3>
          </>
        )}

        {activeComponent === signin && (
          <div className={classes.modalFooter}>
            Forgot your password?
            {' '}
            <button
              type="button"
              onClick={switchToReset}
              className={classes.accountSwitcher}
            >
              Reset It
            </button>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('portal')!,
  );
};

export default Modal;
