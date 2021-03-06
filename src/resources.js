import React, {Fragment} from "react";
import { List, Datagrid, TextField, EmailField, BooleanField,
  NumberField } from 'react-admin';
import MarkAsSafe from "./MarkAsSafe";
import MarkAsUnsafe from "./MarkAsUnsafe";

const SafetyButtons = props => (
  <Fragment>
    <MarkAsSafe {...props} />
    <MarkAsUnsafe {...props} />
  </Fragment>
);

const rowStyle = (record, index) => ({
  backgroundColor: record.isSafe ? 'white' : 'indianred',
});

export const paymentsList = props =>
  <List {...props} bulkActionButtons={<SafetyButtons/>}>
    <Datagrid rowStyle={rowStyle}>
      <NumberField source="id"/>
      <TextField source="cardNumber"/>
      <NumberField source="expirationMonth"/>
      <NumberField source="expirationYear"/>
      <TextField source="CVC"/>
      <TextField source="money"/>
      <TextField source="comment"/>
      <EmailField source="email"/>
      <BooleanField source="isSafe"/>
    </Datagrid>
  </List>;

export const requestsList = props =>
  <List {...props} bulkActionButtons={false}>
    <Datagrid>
      <NumberField source="id"/>
      <TextField source="taxId"/>
      <TextField source="BIC"/>
      <TextField source="accountNumber"/>
      <TextField source="VAT"/>
      <NumberField source="money"/>
      <TextField source="telephone"/>
      <EmailField source="email"/>
    </Datagrid>
  </List>;