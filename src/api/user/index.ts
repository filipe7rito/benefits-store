import httpClient from '../http-service';

export type User = {
  id: string;
  balance: number;
  purchasedProducts: string[];
};

function mapUser(userData: any): User {
  return {
    id: userData.user_id,
    balance: userData.data.balance,
    purchasedProducts: userData.data.product_ids,
  };
}

export async function get(id: string) {
  const { data } = await httpClient.get<any>(`users/${id}`);

  return mapUser(data.user);
}
