import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import classes from './modal.module.sass';
import { AddUserAction } from '../../store/actions/actions';

const Signup: FC = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h2 className={classes.modalTitle}>Sign Up</h2>
      <h3 className="sub-title sub-title--modal">Welcome!</h3>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string().required('Password is required'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match',
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(AddUserAction(values));
          setSubmitting(false);
        }}
      >
        <Form className={classes.modalForm}>
          <div className="form-control form-control--modal">
            <Field
              name="username"
              type="text"
              className="input modal-input"
              placeholder="Your username"
            />
            <ErrorMessage name="name" />
          </div>
          <div className="form-control form-control--modal">
            <Field
              name="email"
              type="email"
              className="input modal-input"
              placeholder="Your email"
            />
            <ErrorMessage name="email" />
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
          <div className="form-control form-control--modal">
            <Field
              name="passwordConfirmation"
              type="password"
              className="input modal-input"
              placeholder="Confirm password"
            />
            <ErrorMessage name="passwordConfirmation" />
          </div>
          <h3 className="sub-title sub-title--modal sub-title--modal-terms">
            By signing up, you agree to Pickbazar&#39;s
            {' '}
            <a href="www.somewhere" className="terms-link">
              Terms & Condtion
            </a>
          </h3>
          <button className="btn btn--modal" type="submit">
            Continue
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default Signup;
