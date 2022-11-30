import React, { FC } from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAdress,
  setAdress,
  modifyAdress,
  setIsEditingAdress,
  toggleModal,
} from '../../store/actions/actions';
import { RootState } from '../../store/reducers';
import { Adress } from '../../store/types/checkout.types';

interface AddAdressFormValues {
  title: string;
  adress: string;
}

interface AdressDetails {
  adress: string | null;
  isEditingAdress: boolean;
  adresses: Adress[];
}

const AddAdressForm: FC = () => {
  const dispatch = useDispatch();
  const { adress, isEditingAdress, adresses }: AdressDetails = useSelector(
    (state: RootState) => state.checkout,
  );
  const editedAdress: Adress | undefined = adresses.find(
    (adr) => adr.id === adress,
  );
  const initialValues: AddAdressFormValues = editedAdress
    ? {
      title: editedAdress.title,
      adress: editedAdress.adress,
    }
    : {
      title: '',
      adress: '',
    };
  const handleSubmit = (values: AddAdressFormValues): void => {
    if (isEditingAdress) {
      dispatch(modifyAdress(values));
      dispatch(setAdress(null));
      dispatch(setIsEditingAdress(false));
    } else {
      dispatch(addAdress({ ...values, id: nanoid() }));
    }
    dispatch(toggleModal());
  };
  return (
    <div className="checkout-form">
      <h3 className="checkout-title">Add New Address</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          adress: Yup.string().required('Required'),
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-control">
            <Field
              name="title"
              type="text"
              className="input checkout-input"
              placeholder="Enter title"
            />
            <ErrorMessage name="title" />
          </div>
          <div className="form-control">
            <Field
              as="textarea"
              name="adress"
              type="text"
              className="input checkout-input checkout-textarea"
              placeholder="Enter adress"
            />
            <ErrorMessage name="adress" />
          </div>
          <button className="btn btn--modal" type="submit">
            Save Address
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddAdressForm;
