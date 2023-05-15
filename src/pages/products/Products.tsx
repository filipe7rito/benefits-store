import { Navigate } from 'react-router-dom';
import ProductItem from './ProductItem';
import Spinner from '../../components/layout/Spinner';
import { useAuth } from '../../hooks/useAuth';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../../api/products';
import Error from '../../components/error/Error';

export default function Products() {
  const { user } = useAuth();
  const { products, status } = useProducts();

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'error') {
    return <Error />;
  }

  return (
    <div>
      <h5 className="text-royalgray fw-bold">Products</h5>
      <div className="container">
        <div className="products-grid">
          {products.map((product: Product) => {
            const isPurchased = user?.purchasedProducts.includes(product.id);

            return (
              <ProductItem
                {...product}
                key={product.id}
                isPurchased={!!isPurchased}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
