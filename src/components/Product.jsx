import React from 'react';
import styles from './styles/product.module.css';
import { Badge, Stack, Box, Tooltip, Link } from '@chakra-ui/react';
import {
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsCart3,
  BsHeartFill,
} from 'react-icons/bs';
import Rating from './Rating';
import { Navigate, useNavigate } from 'react-router-dom';
import { AddToCart } from '../utils/AddToCart';
import { IconButton } from '@chakra-ui/react';

const Product = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <img
          src={'http://127.0.0.1:8000/media/' + `${data.images[0].image}`}
          alt=""
        />
        
        {data.quantity !== undefined && data.quantity ===0  ? (
          
          <div style={{marginTop: '5px'}}>
          <Badge colorScheme="red">out of stock</Badge>
            </div>
        ) : 
           (
            <Stack direction="row" sx={{ marginTop: '10px' }}>
            <Badge colorScheme="red">Best Offer</Badge>
            <Badge colorScheme="green">Best Seller</Badge>
          </Stack>
        )}
        <div className={styles.title}>
          <Link onClick={() => navigate(`/detail/${data.slug}`)}>
            {data.title}
          </Link>
        </div>
        <div className={styles.seller}>
          By <span autoCapitalize="true">{data.shop_name}</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Rating rating={data.rating} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: '10px',
            }}
          >
            {data.quantity !== undefined && data.quantity !== 0 ? (
              <IconButton
                icon={<BsCart3 size={20} />}
                onClick={() => {
                  AddToCart(data.slug, 1);
                }}
              />
            ) : (
              <IconButton
                icon={<BsHeartFill color="" size={20} />}
              ></IconButton>
            )}

            <div style={{ marginLeft: '10px' }}>
              {data.discount == 0 ? (
                <span
                  style={{
                    fontWeight: '700',
                    marginRight: '10px',
                  }}
                >
                  Rs.{data.price}
                </span>
              ) : (
                <span>
                  {' '}
                  <span
                    style={{
                      color: 'tomato',
                      fontWeight: '700',
                      marginRight: '8px',
                    }}
                  >
                    {data.discount}% off.
                  </span>{' '}
                  <strike
                    style={{
                      color: 'gray',
                      fontWeight: '300',
                      marginRight: '8px',
                    }}
                  >
                    Rs.{data.price}
                  </strike>{' '}
                  <span style={{ fontWeight: '700', marginRight: '10px' }}>
                    Rs.{data.net_price}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
