import { Product } from '../_services/shopping-api.service';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}
