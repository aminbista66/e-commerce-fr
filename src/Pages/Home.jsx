import React, { useState, useEffect } from 'react';
import { ProductInstance } from '../utils/AxiosProductInstance';
import { Grid, GridItem, Stack, Button, IconButton } from '@chakra-ui/react';
import { Navbar, ProductList } from '../components';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [previousURL, setPreviousURL] = useState('');
  const [count, setCount] = useState();
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ divident, setDivident ] = useState(() => products.length >= 1 ? products.length : 1)

  useEffect(() => {
    ProductInstance.get(`list/`).then(res => {
      if (res.status === 200) {
        setCount(res.data.count);
        setProducts(res.data.results);
      }
        setNextURL(res.data.next);
        setPreviousURL(res.data.previous);
        setDivident(res.data.results.length)
    });
  }, []);
  console.log(previousURL);
  const changePage = page => {
    ProductInstance.get(`list/?page=${page}`).then(res => {
      if (res.status === 200) {
        setProducts(res.data.results);
        setCurrentPage(page)
      }
        setNextURL(res.data.next);
        setPreviousURL(res.data.previous);
    });
  };

  const handleIconButton = url => {
    ProductInstance.get(url).then(res => {
      if (res.status === 200) {
        setProducts(res.data.results);
      }
        setNextURL(res.data.next);
        setPreviousURL(res.data.previous);
    });
  };

  return (
    <>
      <Navbar />
      <ProductList products={products} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack direction={'row'} sx={{ position: 'absolute', bottom: '0' }}>
          {previousURL !== '' && previousURL !== null ? (
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={() => handleIconButton(previousURL)}
            />
          ) : (
            <></>
          )}
          {count !== undefined ? (
            Array(count / divident)
              .fill('_')
              .map((item, index) => (
                <Button variant={currentPage === index+1 ? "outline" : "solid"}  key={index} onClick={() => changePage(index + 1)}>
                  {index + 1}
                </Button>
              ))
          ) : (
            <></>
          )}
          {nextURL !== '' && nextURL !== null ? (
            <IconButton
              icon={<ChevronRightIcon />}
              onClick={() => handleIconButton(nextURL)}
            />
          ) : (
            <></>
          )}
        </Stack>
      </div>
    </>
  );
};

export default Home;
