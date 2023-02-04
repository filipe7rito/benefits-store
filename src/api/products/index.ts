import httpClient from '../http-service';

export type Product = {
  id: string;
  name: string;
  price: number;
};

export async function get() {
  const { data } = await httpClient.get(`products`);

  return data.products as Product[];
}
