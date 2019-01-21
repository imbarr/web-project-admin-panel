import React from "react";
import { List, Datagrid, TextField, EmailField, BooleanField, NumberField } from 'react-admin';

export const paymentsList = props =>
  <List {...props}>
    <Datagrid>
      <NumberField source="id"/>
      <TextField source="cardNumber"/>
      <TextField source="expirationMonth"/>
      <TextField source="expirationYear"/>
      <TextField source="CVC"/>
      <TextField source="money"/>
      <TextField source="comment"/>
      <EmailField source="email"/>
      <BooleanField source="isSafe"/>
    </Datagrid>
  </List>;

export const requestsList = props =>
  <List {...props}>
    <Datagrid>
      <NumberField source="id"/>
      <TextField source="taxId"/>
      <TextField source="BIC"/>
      <TextField source="accountNumber"/>
      <TextField source="VAT"/>
      <TextField source="money"/>
      <TextField source="telephone"/>
      <EmailField source="email"/>
    </Datagrid>
  </List>;