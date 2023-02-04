import { Navigate } from 'react-router-dom';
import ProductItem from '../../components/ProductItem';
import Spinner from '../../components/Spinner';
import { useAuth } from '../../hooks/useAuth';
import { useProducts } from '../../hooks/useProducts';

export default function Orders() {
  const { user } = useAuth();
  const { products, loading } = useProducts();

  if (loading) {
    return <Spinner />;
  }

  const purchasedProducts = products.filter((product) => {
    return user?.purchasedProducts.includes(product.id);
  });

  return (
    <div>
      <h5 className="text-royalgray fw-bold">My orders</h5>
      <div className="container">
        <div className="row row-cols-auto ">
          {purchasedProducts.map((product) => {
            return (
              <ProductItem
                key={product.id}
                {...product}
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
