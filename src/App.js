import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from "./dataProvider";
import {paymentsList, requestsList} from "./resources";
import authProvider from "./authProvider";

const App = () =>
  <Admin location={{pathname: '/'}} dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="payments" list={paymentsList}/>
    <Resource name="requests" list={requestsList}/>
  </Admin>;

export default App
