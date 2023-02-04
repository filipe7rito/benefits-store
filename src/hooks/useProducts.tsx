import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api';
import { Product } from '../api/products';

type ProductsContextType = {
  products: Product[];
  loading: boolean;
};

const defaultContext = {
  products: [] as Product[],
  loading: false,
};

const ProductsContext = createContext<ProductsContextType>(defaultContext);

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProducts = async () => {
    setLoading(true);
    const products = await api.products.get();

    setProducts(products);

    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const value = useMemo(() => ({ products, loading }), [products]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
};

export { ProductsProvider, useProducts };
