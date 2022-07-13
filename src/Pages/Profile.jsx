import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Stack,
  Avatar,
  Text,
  FormControl,
  FormLabel,
  Button,
  Badge,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { UserInstance, ProductInstance } from '../utils/AxiosAuthInstance';
import { Navbar } from '../components';
import styles from './selectbutton.module.css';
import { useGlobalAuthContext } from '../context/AuthContext';
import jwtDecode from 'jwt-decode';

const Profile = () => {
  let { user_id } = useParams();
  const [data, setData] = useState({});
  const { updateToken, user } = useGlobalAuthContext();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    UserInstance.get(`detail/`)
      .then(res => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch(err => {
        if (localStorage.getItem('authtokens')) {
          if (JSON.parse(localStorage.getItem('authtokens')).refresh) {
            updateToken(JSON.parse(localStorage.getItem('authtokens')).refresh);
            setRefresh(!refresh);
          }
        }
      });

      UserInstance.get(`order/history/`).then(res => {
        console.log(res.data)
      }).catch(err => console.log(err));

  }, [refresh]);

  function registerAsOwner() {
    UserInstance.post(`owner/register/`)
      .then(res => {
        if (res.status === 200) {
          setRefresh(previous => !previous);
          return;
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <Navbar />
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {!data.is_owner ? (
            <>
              <button
                onClick={() => registerAsOwner()}
                className={styles.register_btn}
              >
                Register as owner
              </button>
            </>
          ) : (
            <></>
          )}
          <Avatar size="2xl" name={`${data.first_name} ${data.last_name}`} />
          <Stack>
            <div>
              {data.is_owner ? (
                <Badge colorScheme="green">seller</Badge>
              ) : (
                <></>
              )}
            </div>
            <Text color={'gray.900'} fontSize="4xl">
              {data.first_name} {data.last_name}
            </Text>
            <Text color={'gray.700'} fontSize="sm" sx={{ textAlign: 'center' }}>
              {data.email}
            </Text>
          </Stack>
        </div>
      </div>

    </div>
  );
};

export default Profile;
