import {GET_LIST, UPDATE_MANY} from 'react-admin';
import axios from "axios"
import config from "./config"
import { stringify } from 'query-string';
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();

const requestToHTTP = (type, resource, params) => {
  switch (type) {
    case GET_LIST: {
      let { page, perPage } = params.pagination;
      let { field, order } = params.sort;
      let body = {
        sortField: field,
        order: order,
        start: (page - 1) * perPage,
        end: page * perPage - 1
      };
      return {method: 'GET', url: `${config.serverURL}/admin/${resource}?${stringify(body)}`};
    }
    case UPDATE_MANY: {
      return {
        method: 'PATCH',
        data: {id: params.ids, isSafe: params.data.isSafe},
        url: `${config.serverURL}/admin/${resource}`
      }
    }
    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }
};

const HTTPResponseToData = (response, type, resource, params) => {
  switch (type) {
    case GET_LIST:
      return {
        data: response.data,
        total: parseInt(response.headers['content-range'].split('/').pop(), 10),
      };
    default:
      return { data: response.data };
  }
};

export default (type, resource, params) => {
  const request = requestToHTTP(type, resource, params);
  request.headers = { 'Authorization':  localStorage.getItem('auth')};
  return axios(request)
    .then(
      response =>
        HTTPResponseToData(response, type, resource, params),
      reason => {
        if(reason.response !== undefined && [401, 403].indexOf(reason.response.status) >= 0) {
          history.replace('#/login');
          window.location.reload();
        }
        throw reason
      });
};