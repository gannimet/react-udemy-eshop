import React from 'react';
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
import { omit } from '../../utils/helper';
import { CustomerInformationFieldRefs, CustomerInformationProps, CustomerInformationState } from './interface';
import './style.css';

class CustomerInformation extends React.Component<
  CustomerInformationProps,
  CustomerInformationState
> {
  fieldRefs: CustomerInformationFieldRefs = {} as CustomerInformationFieldRefs;

  constructor(props: CustomerInformationProps) {
    super(props);

    this.state = {
      ...CUSTOMER_INFORMATION_FIELD_INITIAL_STATE,
      hasCompletePurchaseClick: false,
      error: {
        ...CUSTOMER_INFORMATION_FIELD_INITIAL_STATE
      },
      showThankYouModal: false,
    };

    Object.keys(CUSTOMER_INFORMATION_FIELDS_LIST).forEach((key) => {
      const fieldKey = key as CustomerInformationField;
      this.fieldRefs[fieldKey] = React.createRef();
    });
  }

  validateInputField = (field: CustomerInformationField, value: string) => {
    this.setState({
      error: {
        ...this.state.error,
        [field]: value ? '' : CUSTOMER_INFORMATION_FIELD_ERROR,
      }
    });
  };

  handleInputChange = (field: CustomerInformationField) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      const { hasCompletePurchaseClick } = this.state;

      this.setState({
        [field]: value,
      } as CustomerInformationFieldsList);

      hasCompletePurchaseClick && this.validateInputField(field, value);
    };
  };

  allFieldsAreValid = () => {
    let hasError = false;
    const error: CustomerInformationFieldsList = {
      ...CUSTOMER_INFORMATION_FIELD_INITIAL_STATE,
    };

    let hasFocusToErrorField = false;

    Object.keys(CUSTOMER_INFORMATION_FIELDS_LIST).forEach((key) => {
      const fieldKey = key as CustomerInformationField;

      if (!this.state[fieldKey]) {
        error[fieldKey] = CUSTOMER_INFORMATION_FIELD_ERROR;
        hasError = true;

        if (!hasFocusToErrorField) {
          hasFocusToErrorField = true;
          const fieldRef = this.fieldRefs[fieldKey];
          fieldRef.current && fieldRef.current.focus();
        }
      }
    });

    this.setState({ error });

    return !hasError;
  };

  handleButtonClick = () => {
    const { cart } = this.props;

    this.setState({
      hasCompletePurchaseClick: true,
    })

    if (this.allFieldsAreValid()) {
      const shopAPI = new ShopAPI();

      shopAPI.postOrder({
        cart,
        user: {
          ...omit(this.state, ['error', 'hasCompletePurchaseClick']),
        }
      }).then(() => {
        this.setState({
          showThankYouModal: true,
        });
      });
    }
  };

  handleShopMoreClick = () => {
    const { clearCart, history } = this.props;

    clearCart();
    history.push(ROUTE.ALL_PRODUCTS);
  };

  renderInputFields = () => {
    const { error } = this.state;

    return Object.keys(CUSTOMER_INFORMATION_FIELDS_LIST).map((field) => {
      const customerInfoField = field as CustomerInformationField;
      const label = CUSTOMER_INFORMATION_FIELDS_LIST[customerInfoField];

      return (
        <Input
          key={label}
          label={label}
          onChange={this.handleInputChange(customerInfoField)}
          inputContainerStyle={{ marginBottom: '10px' }}
          inputStyle={{ width: CUSTOMER_INFORMATION_FIELD_WIDTH }}
          error={error[customerInfoField]}
          positive={!!this.state[customerInfoField]}
          inputRef={this.fieldRefs[customerInfoField]}
        />
      );
    });
  };
  
  render() {
    const { showThankYouModal } = this.state;

    return (
      <div className="customer-info-container">
        <div className="heading text">Billing information</div>

        {this.renderInputFields()}

        <Button
          type="primary"
          className="complete-purchase-btn"
          onClick={this.handleButtonClick}
          style={{ width: CUSTOMER_INFORMATION_FIELD_WIDTH }}
        >Complete Purchase</Button>

        <Modal modalBodyClassName="customer-info-modal-body" show={showThankYouModal}>
          <div className="header">Thank you! We have received your order.</div>
          <p>Please wait 5 to 10 business days for your order to arrive.</p>
          <Button type="primary" onClick={this.handleShopMoreClick}>Continue shopping</Button>
        </Modal>
      </div>
    )
  }
}

export default CustomerInformation;