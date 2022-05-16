import React, { useEffect, useState } from 'react';
import {
  NumberInputStepper,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Quantity = ({ available_quantity, value, item, setRefresh, refresh }) => {
  const [data, setData] = useState({});

  const handleIncrease = () => {
    axios.post(
      `http://127.0.0.1:8000/products/cart/increase-quantity/${item.slug}/`,
      { quantity: 1 },
      {
        headers: {
          Authorization:
            'Bearer' +
            ' ' +
            JSON.parse(localStorage.getItem('authtokens')).access,
        },
      }
    ).then(res => {
      if(res.status === 200 && res.data.quantity){
        setData(res.data)
        setRefresh(!refresh)
      }else{
        return MySwal.fire(
          'You Hit The Maximum',
          "now go touch some grass",
          'info'
        )        
      }
    }).catch(err => console.log(err))
  };

  const handleDecrease = () => {
    axios.post(
      `http://127.0.0.1:8000/products/cart/decrease-quantity/${item.slug}/`,
      { quantity: 1 },
      {
        headers: {
          Authorization:
            'Bearer' +
            ' ' +
            JSON.parse(localStorage.getItem('authtokens')).access,
        },
      }
    ).then(res => {
      if(res.status === 200 && res.data.quantity){
        setData(res.data)
        setRefresh(!refresh)
      }else{
        return MySwal.fire(
          'You Hit The Minimum',
          "now go touch some grass",
          'info'
        )
      }
    }).catch(err => console.log(err))
  };

  return (
    <NumberInput
      size="md"
      maxW={24}
      defaultValue={1}
      min={1}
      max={available_quantity}
      value={data.quantity ? data.quantity : value}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper onClick={() => handleIncrease()} />
        <NumberDecrementStepper onClick={() => handleDecrease()}/>
      </NumberInputStepper>
    </NumberInput>
  );
};

export default Quantity;
