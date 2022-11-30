import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import classes from './modal.module.sass';
import { signinUserAction } from '../../store/actions/actions';

const Signin: FC = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h2 className={classes.modalTitle}>Welcome Back</h2>
      <h3 className="sub-title sub-title--modal">
        Login with your email & password
      </h3>
      <Formik
        initialValues={{
          email: '',
          identifier: '',
        }}
        validationSchema={Yup.object({
          identifier: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string().required('Password is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signinUserAction(values));
          setSubmitting(false);
        }}
      >
        <Form className={classes.modalForm}>
          <div className="form-control form-control--modal">
            <Field
              name="identifier"
              type="email"
              className="input modal-input"
              placeholder="Your email"
            />
            <ErrorMessage name="identifier" />
          </div>
          <div className="form-control form-control--modal">
            <Field
              name="password"
              type="password"
              className="input modal-input"
              placeholder="Your password"
            />
            <ErrorMessage name="password" />
          </div>
          <button className="btn btn--modal" type="submit">
            Continue
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default Signin;
