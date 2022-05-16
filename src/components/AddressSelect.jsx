import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { Button } from '@chakra-ui/react';
import { Order } from '../utils/order';

const AddressSelect = ({ isModalOpen, closeModal, addresses, item_slug, refresh, setRefresh }) => {
  const [addressId, setAddressId] = useState(addresses[0].id);
  const handleChange = e => {
    setAddressId(e.target.value);
  };
  return (
    <Modal
      onRequestClose={closeModal}
      isOpen={isModalOpen}
      style={{
        overlay: { backgroundColor: 'rgba(10, 10, 10, 0.5)' },
        content: {
          maxHeight: '400px',
          maxWidth: '600px',
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
        },
      }}
    >
      <div
        style={{
          fontWeight: '600',
          fontSize: '20px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        Please Select Your Address Of Delivery
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '60px',
        }}
      >
        <select
          name=""
          id=""
          style={{ padding: '10px 20px', borderRadius: '5px' }}
          onChange={handleChange}
        >
          {addresses !== undefined &&
            addresses.map((address, i) => (
              <option value={address.id}>
                {address.city}, {address.area} - {address.postal_code}
              </option>
            ))}
        </select>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '50px',
        }}
      >
        <Button
          rounded={'sm'}
          size={'sm'}
          py={'6'}
          mt={'3'}
          bg="gray.800"
          color="white"
          textTransform={'uppercase'}
          _hover={{
            transform: 'translateY(2px)',
            boxShadow: 'lg',
          }}
          onClick={() => Order(item_slug, addressId, setRefresh, refresh)}
        //   onClick={() => console.log(item_slug)}
        >
          place order
        </Button>
      </div>
    </Modal>
  );
};

export default AddressSelect;
