import React from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNumber,
  setNumber,
  modifyNumber,
  setIsEditingNumber,
  toggleModal,
} from '../../store/actions/actions';
import { RootState } from '../../store/reducers';
import { INumber } from '../../store/types/checkout.types';

interface AddNumberFormValues {
  number: string;
}

interface numberDetails {
  number: string;
  isEditingNumber: boolean;
  numbers: INumber[];
}

const AddNumberForm = () => {
  const dispatch = useDispatch();
  const { number, isEditingNumber, numbers }: numberDetails = useSelector(
    (state: RootState) => state.checkout,
  );
  const editedNumber: INumber | undefined = numbers.find(
    (num) => num.id === number,
  );
  const initialValues: AddNumberFormValues = editedNumber
    ? {
      number: editedNumber.number,
    }
    : {
      number: '',
    };
  const handleSubmit = (values: AddNumberFormValues): void => {
    if (isEditingNumber) {
      dispatch(modifyNumber(values));
      dispatch(setNumber(''));
      dispatch(setIsEditingNumber(false));
    } else {
      dispatch(addNumber({ ...values, id: nanoid() }));
    }
    dispatch(toggleModal());
  };
  return (
    <div className="checkout-form">
      <h3 className="checkout-title">Add New Number</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          number: Yup.string().required('Required'),
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-control">
            <Field
              name="number"
              type="text"
              className="input checkout-input"
              placeholder="Enter your number"
            />
            <ErrorMessage name="number" />
          </div>

          <button className="btn btn--modal" type="submit">
            Save Number
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddNumberForm;
