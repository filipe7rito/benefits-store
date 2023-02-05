import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { Product } from '../api/products';
import ShoppingCart from '../pages/shoppingCart/ShoppingCart';
import useLocalStorage from './useLocalStorage';

type State = Product[];
type Action =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: Product['id'] }
  | { type: 'CLEAR_CART' };

type CartContextType = {
  cartItems: Product[];
  total: number;
  dispatch: React.Dispatch<Action>;
  openCart: () => void;
  closeCart: () => void;
};

const defaultContext = {
  cartItems: [] as Product[],
  dispatch: () => {},
  openCart: () => {},
  closeCart: () => {},
  total: 0,
};

const CartContext = createContext<CartContextType>(defaultContext);

const cartReducer = (state: Product[], action: Action): State => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newState = [...state, action.payload];
      localStorage.setItem('cartItems', JSON.stringify(newState));
      return newState;
    }
    case 'REMOVE_ITEM': {
      const newState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(newState));
      return newState;
    }
    case 'CLEAR_CART': {
      localStorage.removeItem('cartItems');
      return [];
    }

    default:
      return state;
  }
};

const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [storedCartItems] = useLocalStorage('cartItems', []);
  const [state, dispatch] = useReducer(cartReducer, storedCartItems);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const total = useMemo(
    () => state.reduce((acc, item) => acc + item.price, 0),
    [state]
  );

  const value = useMemo(
    () => ({ cartItems: state, dispatch, openCart, closeCart, total }),
    [state, isOpen, setIsOpen, dispatch]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </CartContext.Provider>
  );
};

const useShoppingCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export { ShoppingCartProvider, useShoppingCart };
