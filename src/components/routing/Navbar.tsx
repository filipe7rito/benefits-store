import { Button, Container, Nav, Navbar as NavbarCs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../helpers/formatters';
import { useAuth } from '../../hooks/useAuth';
import CartButton from './CartButton';
import Logo from '../layout/Logo';

function Navbar() {
  const { logout, user } = useAuth();

  if (!user) return null;

  return (
    <NavbarCs expand="sm" className="p-3 sticky-top">
      <Container>
        <NavbarCs.Brand>
          <div className="mb-2 me-5">
            <Logo />
          </div>
        </NavbarCs.Brand>
        <CartButton className="cart-button-mobile" size="sm" />
        <NavbarCs.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarCs.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className="text-royalgray fw-semibold fs-6"
              to="/products"
              as={Link}
            >
              Products
            </Nav.Link>
            <Nav.Link
              className="text-royalgray fw-semibold"
              to="/my-orders"
              as={Link}
            >
              My orders
            </Nav.Link>
          </Nav>
          <Nav className="pe-4">
            <div className="d-flex align-items-baseline">
              <h6>Balance:</h6>
              <span className="text-royalgray ms-1 me-3">
                {formatCurrency(user!.balance)}
              </span>

              <CartButton className="cart-button" />
            </div>
          </Nav>
          <Nav>
            <Button size="sm" variant="outline-royalgray" onClick={logout}>
              Logout
            </Button>
          </Nav>
        </NavbarCs.Collapse>
      </Container>
    </NavbarCs>
  );
}

export default Navbar;
