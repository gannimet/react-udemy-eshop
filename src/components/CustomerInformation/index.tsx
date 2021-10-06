import update from 'immutability-helper';
import React, { useMemo, useRef, useState } from 'react';
import ShopAPI from '../../api/shopAPI';
import { ROUTE } from '../../constants/route';
import {
  CustomerInformationField,
  CustomerInformationFieldsList,
  CUSTOMER_INFORMATION_FIELDS_LIST,
  CUSTOMER_INFORMATION_FIELD_ERROR,
  CUSTOMER_INFORMATION_FIELD_INITIAL_STATE,
  CUSTOMER_INFORMATION_FIELD_WIDTH
} from '../../constants/user';
import Button from '../../ui-components/Button';
import Input from '../../ui-components/Input';
import Modal from '../../ui-components/Modal';
import { CustomerInformationFieldRefs, CustomerInformationProps } from './interface';
import './style.css';
import { initializeFieldRefs } from './utils';

const CustomerInformation: React.FC<CustomerInformationProps> = ({
  cart, clearCart, history
}) => {
  const fieldsList = useMemo(() => Object.keys(CUSTOMER_INFORMATION_FIELDS_LIST), []);
  const initialFieldRefs = useMemo(initializeFieldRefs, []);
  const fieldRefs = useRef<CustomerInformationFieldRefs>(initialFieldRefs);
  const [fieldState, setFieldState] = useState<CustomerInformationFieldsList>({ ...CUSTOMER_INFORMATION_FIELD_INITIAL_STATE });
  const [fieldErrors, setFieldErrors] = useState<CustomerInformationFieldsList>({ ...CUSTOMER_INFORMATION_FIELD_INITIAL_STATE });
  const [hasCompletePurchaseClick, setHasCompletePurchaseClick] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const validateInputField = (field: CustomerInformationField, value: string) => {
    setFieldErrors(update(fieldErrors, {
      [field]: { $set: value ? '' : CUSTOMER_INFORMATION_FIELD_ERROR },
    }));
  };

  const handleInputChange = (field: CustomerInformationField) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;

      setFieldState(update(fieldState, {
        [field]: { $set: value },
      }));

      hasCompletePurchaseClick && validateInputField(field, value);
    };
  };

  const allFieldsAreValid = () => {
    let hasError = false;
    const error: CustomerInformationFieldsList = {
      ...CUSTOMER_INFORMATION_FIELD_INITIAL_STATE,
    };

    let hasFocusToErrorField = false;

    fieldsList.forEach((key) => {
      const fieldKey = key as CustomerInformationField;

      if (!fieldState[fieldKey]) {
        error[fieldKey] = CUSTOMER_INFORMATION_FIELD_ERROR;
        hasError = true;

        if (!hasFocusToErrorField) {
          hasFocusToErrorField = true;
          const fieldRef = fieldRefs.current[fieldKey];
          fieldRef.current && fieldRef.current.focus();
        }
      }
    });

    setFieldErrors(error);

    return !hasError;
  };

  const handleButtonClick = () => {
    setHasCompletePurchaseClick(true);

    if (allFieldsAreValid()) {
      const shopAPI = new ShopAPI();

      shopAPI.postOrder({
        cart,
        user: fieldState,
      }).then(() => {
        setShowThankYouModal(true);
      });
    }
  };

  const handleShopMoreClick = () => {
    clearCart();
    history.push(ROUTE.ALL_PRODUCTS);
  };

  const renderInputFields = () => {
    return fieldsList.map((field) => {
      const customerInfoField = field as CustomerInformationField;
      const label = CUSTOMER_INFORMATION_FIELDS_LIST[customerInfoField];

      return (
        <Input
          key={label}
          label={label}
          onChange={handleInputChange(customerInfoField)}
          inputContainerStyle={{ marginBottom: '10px' }}
          inputStyle={{ width: CUSTOMER_INFORMATION_FIELD_WIDTH }}
          error={fieldErrors[customerInfoField]}
          positive={!!fieldState[customerInfoField]}
          inputRef={fieldRefs.current[customerInfoField]}
        />
      );
    });
  };
  
  return (
    <div className="customer-info-container">
      <div className="heading text">Billing information</div>

      {renderInputFields()}

      <Button
        type="primary"
        className="complete-purchase-btn"
        onClick={handleButtonClick}
        style={{ width: CUSTOMER_INFORMATION_FIELD_WIDTH }}
      >Complete Purchase</Button>

      <Modal modalBodyClassName="customer-info-modal-body" show={showThankYouModal}>
        <div className="header">Thank you! We have received your order.</div>
        <p>Please wait 5 to 10 business days for your order to arrive.</p>
        <Button type="primary" onClick={handleShopMoreClick}>Continue shopping</Button>
      </Modal>
    </div>
  );
}

export default CustomerInformation;