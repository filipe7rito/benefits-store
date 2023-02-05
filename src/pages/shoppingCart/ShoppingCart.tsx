import { useEffect, useState } from 'react';
import { Button, Offcanvas, Stack } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../api';
import { Product } from '../../api/products';
import { formatCurrency } from '../../helpers/formatters';
import { useAuth } from '../../hooks/useAuth';
import { useShoppingCart } from '../../hooks/useShoppingCart';
import CartItem from './CartItem';

type ShoppingCartProps = {
  isOpen: boolean;
};

type CheckoutOrderStatus = 'idle' | 'submitting' | 'submitted';

function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { cartItems, total, closeCart, dispatch } = useShoppingCart();
  const { user, fetchUser } = useAuth();
  const [checkoutOrderStatus, setOrderStatus] =
    useState<CheckoutOrderStatus>('idle');

  const hasItems = cartItems.length > 0;

  // Refresh user data after order is submitted
  useEffect(() => {
    const refreshUser = async () => {
      await fetchUser();
    };

    if (checkoutOrderStatus === 'submitted') {
      refreshUser();
    }
  }, [checkoutOrderStatus]);

  const handleCheckout = async () => {
    const items = cartItems.map((item) => item.id);

    setOrderStatus('submitting');

    try {
      await api.orders.create(items, user!.id);

      setOrderStatus('submitted');
      dispatch({ type: 'CLEAR_CART' });

      closeCart();

      toast.success('Your order has been submitted', {
        position: toast.POSITION.TOP_LEFT,
      });
    } catch (error) {
      setOrderStatus('idle');

      toast.error('An error occurred submitting your order', {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  return (
    <Offcanvas
      show={isOpen}
      onHide={closeCart}
      placement="end"
      data-testid="shopping-cart"
    >
      <Offcanvas.Header closeButton className="bg-royalblue">
        <Offcanvas.Title className="fw-bold">
          <i className="me-2 bi bi-cart4"></i>
          <div className="d-inline-block">Shopping Cart</div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      {hasItems && (
        <div className="bg-royalblue d-md-flex justify-content-md-end px-4">
          <Button
            size="sm"
            variant="royalgray"
            onClick={() => {
              dispatch({ type: 'CLEAR_CART' });
            }}
          >
            Clear cart
            <i className="ms-1 bi bi-cart-x"></i>
          </Button>
        </div>
      )}
      <Offcanvas.Body className="bg-royalblue">
        <Stack className="px-2" gap={3}>
          <Stack className="px-2" gap={3}>
            {cartItems.map((item: Product) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
        </Stack>
      </Offcanvas.Body>

      <div style={{ height: '8.5rem' }} className="d-flex justify-content-end">
        <div className="align-self-center m-4 w-100">
          <div className="ms-auto fw-bold fs-6 my-3">
            Total: {formatCurrency(total)}
          </div>
          {hasItems && (
            <Button
              variant="royalorange"
              className="w-100"
              onClick={handleCheckout}
              disabled={checkoutOrderStatus === 'submitting'}
            >
              Checkout
              {checkoutOrderStatus === 'submitting' ? (
                <span
                  className="spinner-border spinner-border-sm ms-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                <i className="ms-1 bi bi-bag-check-fill"></i>
              )}
            </Button>
          )}
        </div>
      </div>
    </Offcanvas>
  );
}

export default ShoppingCart;
