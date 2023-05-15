import { Navigate } from 'react-router-dom';
import ProductItem from '../products/ProductItem';
import Spinner from '../../components/layout/Spinner';
import { useAuth } from '../../hooks/useAuth';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../../api/products';
import Error from '../../components/error/Error';

export default function Orders() {
  const { user } = useAuth();
  const { products, status } = useProducts();

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'error') {
    return <Error />;
  }

  // Filter products that the user has purchased
  const purchasedProducts = products.filter((product: Product) => {
    return user?.purchasedProducts.includes(product.id);
  });

  return (
    <div>
      <h5 className="text-royalgray fw-bold">My orders</h5>
      <div className="container">
        <div className="products-grid">
          {purchasedProducts.map((product) => {
            return (
              <ProductItem
                {...product}
                key={product.id}
                isPurchased
                hideActions
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
