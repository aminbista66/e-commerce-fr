import React, { UseState, useRef, useState } from 'react';
import { Avatar, Flex } from '@chakra-ui/react';
import styles from './styles/nameavatar.module.css';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from '@chakra-ui/react'
import { BiLogOut } from 'react-icons/bi';
import { useGlobalAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NameAvatar = ({ user }) => {
  const dropdown_ref = useRef('');
  const {logoutUser} = useGlobalAuthContext();
  const navigate = useNavigate();
  const handleDropDownClick = () => {
    if (dropdown_ref.current.style.display === 'none') {
      dropdown_ref.current.style.display = 'block';
    } else {
      dropdown_ref.current.style.display = 'none';
    }
  };

  return (
    <div className={styles.cnt}>
      <Flex onClick={() => handleDropDownClick()}>
        <span className={styles.name}>{user.name}</span>
        <div className={styles.avatar}>
          <Avatar name={user.name} size="sm" />
        </div>
      </Flex>

      <div
      className={styles.dropdown_container}
        ref={dropdown_ref}
        style={{
          backgroundColor: '#202121',
          position: 'absolute',
          top: '70px',
          right: '150px',
          display: 'none',
          color: '#fff',
          padding: '5px 10px',
        }}
      >
        <div className={styles.dropdown_item}>
          <MdAccountCircle size={20}/><Link sx={{marginLeft: '10px'}} onClick = {() => navigate(`/profile/${user.user_id}`)}>  PROFILE</Link>
        </div>
        <div className={styles.dropdown_item}>
          <BiLogOut size={20}/><Link sx={{marginLeft: '10px'}} onClick={() => logoutUser()}>  LOGOUT</Link>
        </div>
      </div>
    </div>
  );
};

export default NameAvatar;
