import {GET_LIST, UPDATE} from 'react-admin';
import { stringify } from 'query-string';

const API_URL = 'my.api.url';

const requestToHTTP = (type, resource, params) => {
  switch (type) {
    case GET_LIST: {
      let { page, perPage } = params.pagination;
      let { field, order } = params.sort;
      let query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1])
      };
      return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case UPDATE:
      return {
        url: `${API_URL}/${resource}?${stringify({isSafe: params.data.isSafe, id: params.id})}`,
        options: { method: 'PUT'}
      };
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};

const HTTPResponseToData = (response, type, resource, params) => {
  const { headers, json } = response;
  switch (type) {
    case GET_LIST:
      return {
        data: json.map(x => x),
        total: parseInt(headers.get('content-range').split('/').pop(), 10),
      };
    default:
      return { data: json };
  }
};

export default (type, resource, params) => {
  const { url, options } = requestToHTTP(type, resource, params);
  return fetch(url, options).then(r => r.json())
    .then(response => HTTPResponseToData(response, type, resource, params));
};