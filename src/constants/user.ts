export type CustomerInformationField =
  | 'completeName'
  | 'address'
  | 'city'
  | 'stateOrProvince'
  | 'mobileNo';

export type CustomerInformationFieldsList = {
  [field in CustomerInformationField]: string;
};

export const CUSTOMER_INFORMATION_FIELD_LABELS: CustomerInformationFieldsList = {
  completeName: 'Complete Name (Last Name, First Name, M. I.)',
  address: 'Address (House No., Lot, Blk, Street)',
  city: 'City',
  stateOrProvince: 'State/Province',
  mobileNo: 'Mobile Number',
};

export const CUSTOMER_INFORMATION_FIELD_WIDTH = 'Calc(100% - 20px)';