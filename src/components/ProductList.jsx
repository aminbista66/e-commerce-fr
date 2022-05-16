import React from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import Product from './Product';

const ProductList = ({ products }) => {
  return (
    <Box sx={{margin: '60px'}}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {products.map((product, index) => (
          <Product data={product} key={index}/>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
