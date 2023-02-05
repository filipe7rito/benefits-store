import React from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ProductsProvider } from '../../hooks/useProducts';
import { ShoppingCartProvider } from '../../hooks/useShoppingCart';
import Spinner from './Spinner';
import Navbar from '../routing/Navbar';

function SharedLayout() {
  return (
    <div className="layout">
      <ShoppingCartProvider>
        <Navbar />
        <Container className="container-fluid h-100 main-container">
          <Stack className="px-4 py-2">
            <ProductsProvider>
              <Outlet />
            </ProductsProvider>
          </Stack>
        </Container>
      </ShoppingCartProvider>
    </div>
  );
}

export default SharedLayout;
