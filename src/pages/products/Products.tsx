import { Navigate } from 'react-router-dom';
import ProductItem from '../../components/ProductItem';
import Spinner from '../../components/Spinner';
import { useAuth } from '../../hooks/useAuth';
import { useProducts } from '../../hooks/useProducts';

export default function Products() {
  const { user } = useAuth();
  const { products, loading } = useProducts();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h5 className="text-royalgray fw-bold">Products</h5>
      <div className="container">
        <div className="row row-cols-auto justify-content-start">
          {products.map((product) => {
            debugger;
            const isPurchased = user?.purchasedProducts.includes(product.id);

            return (
              <ProductItem
                key={product.id}
                {...product}
                isPurchased={!!isPurchased}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
