import React from 'react';
import { Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


const CustomLinks = () => {
  const navigate = useNavigate();
  return (
    <>
      <Link  sx={{ fontWeight: 'bold', fontSize: '14px' }} onClick={()=> navigate('/register')}>
        REGISTER
      </Link> /
      <Link sx={{ fontWeight: 'bold', fontSize: '14px' }} onClick={()=> navigate('/login')}>
        LOGIN
      </Link>
    </>
  );
};

export default CustomLinks;
