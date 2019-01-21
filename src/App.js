import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from "./dataProvider";
import {paymentsList, requestsList} from "./resources";

const App = () =>
  <Admin dataProvider={dataProvider}>
    <Resource name="payments" list={paymentsList}/>
    <Resource name="requests" list={requestsList}/>
  </Admin>;

export default App;
