import { createContext, useContext, useState, useEffect } from 'react';
import { AuthInstance, VerifyInstance } from '../utils/AxiosAuthInstance';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext('');

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() =>
    localStorage.getItem('authtokens')
      ? jwtDecode(JSON.parse(localStorage.getItem('authtokens')).access)
      : null
  );
  const [authtokens, setAuthtokens] = useState(() =>
    localStorage.getItem('authtokens')
      ? JSON.parse(localStorage.getItem('authtokens'))
      : null
  );

  const loginUser = data => {
    AuthInstance.post(``, data).then(res => {
      localStorage.setItem('authtokens', JSON.stringify(res.data));
      setAuthtokens(res.data);
      setUser(jwtDecode(res.data.access));
      navigate('/');
    });
  };

  const logoutUser = () => {
    localStorage.removeItem('authtokens');
    setAuthtokens(null);
    setUser(null);
    navigate('/login/');
  };

  const updateToken = refresh_token => {
    let previous_token = JSON.parse(localStorage.getItem('authtokens'));
    AuthInstance.post(`refresh/`, {
      refresh: refresh_token,
    }).then(res => {
      console.log(res.data);
      let new_token_object = {
        access: res.data.access,
        refresh: previous_token.refresh,
      };
      localStorage.setItem('authtokens', JSON.stringify(new_token_object));
    });
  };

  useEffect(() => {
    if (localStorage.getItem('authtokens')) {
      VerifyInstance.post(`token/verify/`, {
        token: JSON.parse(localStorage.getItem('authtokens')).access,
      }).then(res => {
        if (res.status !== 200) {
          let interval = setInterval(() => {
            updateToken(JSON.parse(localStorage.getItem('authtokens')).refresh);
            console.log('updated');
          }, 300000);
          return () => clearInterval(interval);
        }
      });
    } else return;
  }, [authtokens]);

  return (
    <AuthContext.Provider value={{ loginUser, user, logoutUser, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useGlobalAuthContext() {
  return useContext(AuthContext);
}
