import { rest } from 'msw';
import { products } from '../fixtures/products';
import { user } from '../fixtures/user';

const { VITE_API_DOMAIN } = import.meta.env;

export const baseUrl = VITE_API_DOMAIN;

export const userHandler = [
  rest.get(`${baseUrl}/users/:userId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),
];

export const productsHandler = [
  rest.get(`${baseUrl}/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),
];

export const orderHandler = [
  rest.post(`${baseUrl}/orders`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];
