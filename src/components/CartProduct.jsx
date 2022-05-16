import React, { useState } from 'react';
import { Stack, Text, Box, Button } from '@chakra-ui/react';
import styles from './styles/cartproduct.module.css';
import Quantity from './Quantity';
import Rating from './Rating';
import { AiOutlineClose } from 'react-icons/ai';
import { Badge } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ProductInstance } from '../utils/AxiosProductInstance';
import { Order } from '../utils/order';
import Modal from 'react-modal/lib/components/Modal';
import { useGlobalAddressContext } from '../context/AddressContext';
import AddressSelect from './AddressSelect';

const CartProduct = ({ items, setRefresh, refresh }) => {
  const deleteCartProduct = slug => {
    ProductInstance.delete(`cart/delete/${slug}`, {
      headers: {
        Authorization:
          'Bearer' +
          ' ' +
          JSON.parse(localStorage.getItem('authtokens')).access,
      },
    }).then(res => {
      if (res.status === 204) {
        setRefresh(!refresh);
      }
    });
  };

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
    <>
      <Stack
        sx={{ backgroundColor: 'white', margin: '30px 60px', padding: '30px' }}
      >
        <Text
          textTransform={'uppercase'}
          fontSize="3xl"
          sx={{ fontWeight: '500' }}
        >
          my bag
        </Text>
        {items !== undefined ? (
          items.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                gap: '30px',
                borderTop: '1px solid #D0D0D0',
                padding: '15px 0',
                width: '800px',
              }}
            >
              <img
                src={'http://127.0.0.1:8000/media/' + `${item.images[0].image}`}
                alt=""
                className={styles.img}
              />
              <div style={{ width: '1000px', maxWidth: '1000px' }}>
                {item.stock <= 5 ? (
                  item.stock === 0 ? (
                    <Badge colorScheme="red">out of stock</Badge>
                  ) : (
                    <Badge colorScheme="yellow">Only {item.stock} left</Badge>
                  )
                ) : (
                  <></>
                )}
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span className={styles.price}>Rs. {item.price}</span>
                  <AiOutlineClose
                    size={25}
                    color="black"
                    onClick={() => deleteCartProduct(item.slug)}
                  />
                </div>
                <Stack>
                  <span
                    className={styles.title}
                    onClick={() => navigate(`/detail/${item.product_slug}`)}
                  >
                    {item.product_name}
                  </span>
                  <Text
                    sx={{ color: 'gray.500', paddingTop: '10px' }}
                    fontSize="sm"
                  >
                    BY {item.shop_name}
                  </Text>
                  <Stack direction={'row'} gap={5}>
                    <Rating rating={item.rating} />
                    <span style={{ paddingTop: '10px' }}>
                      <Quantity
                        available_quantity={10}
                        value={item.quantity}
                        item={item}
                        setRefresh={setRefresh}
                        refresh={refresh}
                      />
                    </span>
                  </Stack>
                </Stack>
                {item.stock > 0 ? (
                  <Button
                    rounded={'none'}
                    w={'full'}
                    size={'sm'}
                    py={'6'}
                    mt={'3'}
                    bg="gray.900"
                    color="white"
                    textTransform={'uppercase'}
                    _hover={{
                      transform: 'translateY(2px)',
                      boxShadow: 'lg',
                    }}
                    onClick={() => handleOrderclick(item.slug)}
                  >
                    Order Now
                  </Button>
                ) : (
                  <Button
                    rounded={'none'}
                    w={'full'}
                    size={'sm'}
                    py={'6'}
                    mt={'3'}
                    bg="tomato"
                    color="white"
                    textTransform={'uppercase'}
                    _hover={{
                      transform: 'translateY(2px)',
                      boxShadow: 'lg',
                    }}
                  >
                    Add to wishlist
                  </Button>
                )}
              </div>
              <AddressSelect
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                addresses={addresses}
                item_slug={item_slug}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </Box>
          ))
        ) : (
          <></>
        )}
      </Stack>
    </>
  );
};

export default CartProduct;
