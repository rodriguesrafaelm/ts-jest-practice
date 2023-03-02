import { MessagingProtocol } from './interfaces/messaging-protocol';
import { CartItem } from './interfaces/cart-item';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { Order } from './order';
import { PersistenceProtocol } from './interfaces/persistence-protocol';
import { CustomerOrder } from './interfaces/customer-protocol';

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem[]> {
    return [];
  }
  addItem(item: CartItem): void {
    throw new Error('Method not implemented.');
  }
  removeItem(index: number): void {
    {
      //
    }
  }
  isEmpty(): boolean {
    throw new Error('Method not implemented.');
  }
  total(): number {
    throw new Error('Method not implemented.');
  }
  totalWithDiscount(): number {
    throw new Error('Method not implemented.');
  }
  clear(): void {
    throw new Error('Method not implemented.');
  }
}

class MessagingMock implements MessagingProtocol {
  sendMessage(msg: string): void {
    throw new Error('Method not implemented.');
  }
}

class PersistenceMock implements PersistenceProtocol {
  saveOrder(): void {
    throw new Error('Method not implemented.');
  }
}

class CustomerMock implements CustomerOrder {
  getName(): string {
    throw new Error('Method not implemented.');
  }
  getIDN(): string {
    throw new Error('Method not implemented.');
  }
}

const createSUT = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistenceMock = new PersistenceMock();
  const customerMock = new CustomerMock();
};

describe('test order', () => {
  afterEach(() => jest.clearAllMocks());
  it('should not checkout if cart is empty');
});
