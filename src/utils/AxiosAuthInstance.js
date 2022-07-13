import axios from 'axios';

const AuthInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/token/',
  timeout: 4000,
  headers: {
    'content-Type': 'application/json',
    Authorization: localStorage.getItem('authtokens')
      ? 'Bearer' + ' ' + JSON.parse(localStorage.getItem('authtokens')).access
      : '',
  },
});

const UserInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/users/',
  timeout: 4000,
  headers: {
    'content-Type': 'application/json',
    Authorization: localStorage.getItem('authtokens')
      ? 'Bearer' + ' ' + JSON.parse(localStorage.getItem('authtokens')).access
      : '',
  },
});

const VerifyInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 4000,
  headers: {
    'content-Type': 'application/json',
  },
});



export { AuthInstance, UserInstance, VerifyInstance };
