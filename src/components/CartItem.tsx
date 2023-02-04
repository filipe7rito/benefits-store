import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Product } from '../api/products';
import { formattedPrice } from '../helpers/formatters';
import { getLogo } from '../helpers/logoUtils';
import { useShoppingCart } from '../hooks/useShoppingCart';

export default function CartItem({ id, name, price }: Product) {
  const { dispatch } = useShoppingCart();

  const handleRemoveFromCart = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  return (
    <div className="d-flex justify-content-between align-items-center gap-2">
      <Card className="flex-grow-1 shadow-sm bg-body-tertiary rounded cart-item">
        <Card.Body className="d-flex justify-content-evenly align-items-center py-1">
          <Card.Img className="cart-item-img" variant="top" src={getLogo(id)} />
          <div className="flex-grow-1 d-flex flex-column align-items-end">
            <h6 className="text-royalgray card-title text-align-rightn text-end fw-600">
              {name}
            </h6>
            <Card.Subtitle className="mb-2 text-muted fw-bold">
              {formattedPrice(price)}
            </Card.Subtitle>
          </div>
        </Card.Body>
      </Card>
      <Button
        size="sm"
        variant="outline-royalgray rounded-circle ms-1"
        onClick={handleRemoveFromCart}
      >
        <i className="bi bi-x"></i>
      </Button>
    </div>
  );
}
