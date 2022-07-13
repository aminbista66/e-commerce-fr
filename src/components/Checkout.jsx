import React, { useState, useEffect } from 'react';
import { Box, Stack, Text, Button } from '@chakra-ui/react';
import styles from './styles/checkout.module.css';
import { MdLocalShipping } from 'react-icons/md';
import axios from 'axios';
import AddressSelect from './AddressSelect';
import { useGlobalAddressContext } from '../context/AddressContext';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ setRefresh, refresh }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/products/pre-checkout/summary', {
        headers: {
          Authorization:
            'Bearer' +
            ' ' +
            JSON.parse(localStorage.getItem('authtokens')).access,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch(err => console.log(err));
  }, [refresh]);

  const { addresses } = useGlobalAddressContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item_slug, set_item_slug] = useState();

  const handleOrderclick = slug => {
    setIsModalOpen(true);
    set_item_slug(slug);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        margin: '30px 60px',
        padding: '30px',
        height: '500px',
        width: '700px',
      }}
      className={styles.sticky_box}
    >
      <Text
        textTransform={'uppercase'}
        fontSize="2xl"
        sx={{ fontWeight: '500' }}
      >
        SUMMARY
      </Text>
      <div className={styles.subtotal}>
        <span className={styles.title}>Sub-total</span>
        <span className={styles.price}>Rs.{data.net_amount}</span>
      </div>
      <div className={styles.discount}>
        <span className={styles.title}>Delivery-charge</span>
        <span className={styles.price}>Rs.100</span>
      </div>
      <div className={styles.discount}>
        <span className={styles.title}>Total</span>
        <span className={styles.price}>Rs.{data.net_amount + 100}</span>
      </div>
      
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={'center'}
        sx={{ marginTop: '30px' }}
      >
        <MdLocalShipping />
        <Text>2-3 business days delivery</Text>
      </Stack>
      <AddressSelect
        isModalOpen={isModalOpen}
        addresses={addresses}
        closeModal={closeModal}
        item_slug={item_slug}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default Checkout;
