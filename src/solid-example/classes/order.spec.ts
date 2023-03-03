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
    ///
  }
  removeItem(index: number): void {
    {
      //
    }
  }
  isEmpty(): boolean {
    return false;
  }
  total(): number {
    return 1;
  }
  totalWithDiscount(): number {
    return 1;
  }
  clear(): void {
    ///
  }
}

class MessagingMock implements MessagingProtocol {
  sendMessage(msg: string): void {
    console.log(msg);
  }
}

class PersistenceMock implements PersistenceProtocol {
  saveOrder(): void {
    ///
  }
}

class CustomerMock implements CustomerOrder {
  getName(): string {
    return 'string';
  }
  getIDN(): string {
    return 'string';
  }
}

const createSUT = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistenceMock = new PersistenceMock();
  const customerMock = new CustomerMock();
  const sut = new Order(
    shoppingCartMock,
    messagingMock,
    persistenceMock,
    customerMock,
  );

  return {
    sut,
    shoppingCartMock,
    messagingMock,
    persistenceMock,
  };
};

describe('test order', () => {
  afterEach(() => jest.clearAllMocks());
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSUT();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(true);
    sut.checkOut();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSUT();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(false);
    sut.checkOut();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send an email to customer', () => {
    const { sut, messagingMock } = createSUT();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');
    sut.checkOut();
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
    expect(messagingMockSpy).toHaveBeenCalledWith(
      'Seu pedido foi recebido com o total de R$ 1',
    );
    expect(sut.orderStatus).toBe('closed');
  });

  it('should save order', () => {
    const { sut, persistenceMock } = createSUT();
    const persistenceMockSpy = jest.spyOn(persistenceMock, 'saveOrder');
    sut.checkOut();
    expect(persistenceMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should clear cart', () => {
    const { sut, shoppingCartMock } = createSUT();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');
    sut.checkOut();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });
});
