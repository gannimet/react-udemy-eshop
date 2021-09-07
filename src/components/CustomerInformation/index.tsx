import React from 'react';
import {
  CustomerInformationField,
  CUSTOMER_INFORMATION_FIELD_LABELS,
  CUSTOMER_INFORMATION_FIELD_WIDTH
} from '../../constants/user';
import Button from '../../ui-components/Button';
import Input from '../../ui-components/Input';
import { CustomerInformationProps, CustomerInformationState } from './interface';
import './style.css';

class CustomerInformation extends React.Component<
  CustomerInformationProps,
  CustomerInformationState
> {
  handleInputChange = (field: CustomerInformationField) => () => {

  };

  renderInputFields = () => {
    return Object.keys(CUSTOMER_INFORMATION_FIELD_LABELS).map((field) => {
      const customerInfoField = field as CustomerInformationField;
      const label = CUSTOMER_INFORMATION_FIELD_LABELS[customerInfoField];

      return (
        <Input
          key={label}
          label={label}
          onChange={this.handleInputChange(customerInfoField)}
          inputContainerStyle={{ marginBottom: '10px' }}
          inputStyle={{ width: CUSTOMER_INFORMATION_FIELD_WIDTH }}
        />
      );
    });
  };
  
  render() {
    return (
      <div className="customer-info-container">
        <div className="heading">Billing information</div>

        {this.renderInputFields()}

        <Button
          type="primary"
          className="complete-purchase-btn"
          onClick={() => {}}
          style={{ width: CUSTOMER_INFORMATION_FIELD_WIDTH }}
        >Complete Purchase</Button>
      </div>
    )
  }
}

export default CustomerInformation;