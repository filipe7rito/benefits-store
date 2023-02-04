import httpClient from '../http-service';
import { Product } from '../products';
import { User } from '../user';

export async function create(items: Product['id'][], userId: User['id']) {
  await httpClient.post(`orders`, {
    order: {
      items,
      user_id: userId,
    },
  });
}
