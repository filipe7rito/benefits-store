import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { useShoppingCart } from '../../hooks/useShoppingCart';

export default function CartButton({
  className,
  size,
}: {
  className?: string;
  size?: ButtonProps['size'];
}) {
  const { cartItems, openCart } = useShoppingCart();

  return (
    <Button
      variant="outline-royalorange"
      size={size}
      className={`rounded-circle ${className}`}
      style={{
        position: 'relative',
        width: '3rem',
        height: '3rem',
      }}
      onClick={openCart}
    >
      <i className="bi bi-cart-plus-fill"></i>
      <span
        className="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-royalgray"
        style={{
          marginTop: '-0.5rem',
          marginRight: '-0.5rem',
        }}
      >
        {cartItems.length}
      </span>
    </Button>
  );
}
