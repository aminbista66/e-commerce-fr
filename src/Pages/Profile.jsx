import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Stack,
  Avatar,
  Text,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { UserInstance } from '../utils/AxiosAuthInstance';
import { Navbar } from '../components';
import styles from './selectbutton.module.css';
import { useGlobalAuthContext } from '../context/AuthContext';

const Profile = () => {
  let { user_id } = useParams();
  const [data, setData] = useState({});
  const { updateToken } = useGlobalAuthContext();
  const [ refresh, setRefresh ] = useState(false);
  useEffect(() => {
    UserInstance.get(`detail/`)
      .then(res => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch(err =>{
        if(localStorage.getItem('authtokens')){
          if(JSON.parse(localStorage.getItem("authtokens")).refresh){
            updateToken(JSON.parse(localStorage.getItem("authtokens")).refresh);
            setRefresh(!refresh)
          }
        }
      });
  }, [refresh]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <Navbar />
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <Avatar size="2xl" name={`${data.first_name} ${data.last_name}`} />
          <Stack>
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
