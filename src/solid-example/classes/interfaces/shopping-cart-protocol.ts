import { CartItem } from './cart-item';

export interface ShoppingCartProtocol {
  items: Readonly<CartItem[]>;

  addItem(item: CartItem): void;

  removeItem(index: number): void;

  isEmpty(): boolean;

  total(): number;

  totalWithDiscount(): number;

  clear(): void;
}
