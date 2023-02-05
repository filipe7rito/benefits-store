import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Product } from '../../api/products';
import { formatCurrency } from '../../helpers/formatters';
import { getLogo } from '../../helpers/logoUtils';
import { useShoppingCart } from '../../hooks/useShoppingCart';

type Props = Product & {
  isPurchased?: boolean;
  hideActions?: boolean;
};

export default function ProductItem({
  id,
  name,
  price,
  isPurchased,
  hideActions,
}: Props) {
  const { cartItems, dispatch } = useShoppingCart();

  // Check if the product is already in the cart
  const isInCart = cartItems.some((item) => item.id === id);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { id, name, price } });
  };

  const handleRemoveFromCart = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const renderPurchasedTooltip = (props: any) => {
    if (!isPurchased) return <></>;

    return (
      <Tooltip id="button-tooltip" {...props}>
        Product already purchased!
      </Tooltip>
    );
  };

  const renderActions = () => {
    if (hideActions) return <></>;

    return (
      <div className="text-center">
        {isInCart ? (
          <Button variant="royalgray" onClick={handleRemoveFromCart}>
            <span>Remove from cart</span>
            <i className="ms-2 bi bi bi-cart-dash-fill"></i>
          </Button>
        ) : (
          <OverlayTrigger
            delay={{ show: 250, hide: 400 }}
            placement="top"
            overlay={renderPurchasedTooltip}
          >
            <span>
              <Button
                variant="royalorange"
                onClick={handleAddToCart}
                disabled={isPurchased}
              >
                <span>Add to cart</span>
                <i className="ms-2 bi bi-cart-plus-fill"></i>
              </Button>
            </span>
          </OverlayTrigger>
        )}
      </div>
    );
  };

  return (
    <div key={id} className="col mt-3">
      <Card className="product-item">
        <Card.Img
          className="product-item-img"
          variant="top"
          src={getLogo(id)}
        />
        <Card.Body className="pt-0">
          <Card.Title className="text-royalgray">{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted fw-bold">
            {formatCurrency(price)}
          </Card.Subtitle>
          <Card.Text>Lorem ipsum dolor sit amet.</Card.Text>
          {renderActions()}
        </Card.Body>
      </Card>
    </div>
  );
}
