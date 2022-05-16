import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Detail from './Pages/Detail';
import Profile from './Pages/Profile';
import Cart from './Pages/Cart';
import { PrivateRoute } from './utils/PrivateRoute';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route element={<Home />} path="/" index />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Detail />} path="/detail/:product_slug" />
        <Route
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
          path="/profile/:user_id"
        />
        <Route
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
          path="/cart"
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
