import { setupServer } from 'msw/node';
import { userHandler, productsHandler, orderHandler } from './handlers';

export const server = setupServer(
  ...userHandler,
  ...productsHandler,
  ...orderHandler
);
