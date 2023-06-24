import { Product } from '../../products/_services/products-api.service';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}
