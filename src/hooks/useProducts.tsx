import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api';
import { Product } from '../api/products';

type Status = 'idle' | 'loading' | 'error';

type ProductsContextType = {
  products: Product[];
  status: Status;
};

const defaultContext: ProductsContextType = {
  products: [],
  status: 'idle',
};

const ProductsContext = createContext<ProductsContextType>(defaultContext);

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>('idle');

  const getProducts = async () => {
    try {
      setStatus('loading');

      const products = await api.products.get();

      setProducts(products);

      setStatus('idle');
    } catch (e) {
      setStatus('error');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const value = useMemo(() => ({ products, status }), [products]);

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
