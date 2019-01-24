import { AUTH_LOGIN } from 'react-admin';
import config from './config';
import axios from "axios"

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const auth = 'Basic ' + btoa(username + ':' + password);
    const request = {
      url: `${config.serverURL}/admin`,
      method: 'GET',
      headers: { 'Authorization': auth }
    };
    return axios(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        localStorage.setItem('auth', auth);
        return response
      })
  }
  return Promise.resolve();
}