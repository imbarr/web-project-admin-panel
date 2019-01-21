import React, {Fragment} from "react";
import { List, Datagrid, TextField, EmailField, BooleanField, NumberField } from 'react-admin';
import MarkAsSafe from "./MarkAsSafe";
import MarkAsUnsafe from "./MarkAsUnsafe";

const SafetyButtons = props => (
  <Fragment>
    <MarkAsSafe {...props} />
    {/* Add the default bulk delete action */}
    <MarkAsUnsafe {...props} />
  </Fragment>
);


export const paymentsList = props =>
  <List {...props} bulkActionButtons={<SafetyButtons/>}>
    <Datagrid>
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