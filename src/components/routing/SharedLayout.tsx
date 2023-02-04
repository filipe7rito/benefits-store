import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ProductsProvider } from '../../hooks/useProducts';
import { ShoppingCartProvider } from '../../hooks/useShoppingCart';
import Spinner from '../Spinner';
import Navbar from './Navbar';

function SharedLayout() {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="layout">
      <ShoppingCartProvider>
        <Navbar />
        <Container className="container-fluid h-100 main-container">
          <div
            style={{
              padding: '1rem 2rem',
            }}
          >
            <ProductsProvider>
              <Outlet />
            </ProductsProvider>
          </div>
        </Container>
      </ShoppingCartProvider>
    </div>
  );
}

export default SharedLayout;
