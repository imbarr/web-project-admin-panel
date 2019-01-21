import {GET_LIST, UPDATE_MANY} from 'react-admin';
import axios from "axios"

const API_URL = 'http:\\\\localhost:8081';

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
      return { url: `${API_URL}/fetch-${resource}`, body: body};
    }
    case UPDATE_MANY: {
      return { url: `${API_URL}/payment`, body: {id: params.ids, isSafe: params.data.isSafe}};
    }
    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }
};

const HTTPResponseToData = (response, type, resource, params) => {
  switch (type) {
    case GET_LIST:
      return {
        data: response.data.result,
        total: response.data.count,
      };
    default:
      return { data: response.data };
  }
};

export default (type, resource, params) => {
  const { url, body } = requestToHTTP(type, resource, params);
  return axios.post(url, JSON.stringify(body))
    .then(response => HTTPResponseToData(response, type, resource, params));
};