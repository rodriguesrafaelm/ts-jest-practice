import { CartItem } from './interfaces/cart-item';
import { Discount } from './discount';
import { ShoppingCart } from './shopping-cart';

const createDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock();
};

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
};

const createSutWithProducts = () => {
  const { sut, discountMock } = createSut();
  const cartItem1 = createCartItem('Camisa', 70.5);
  const cartItem2 = createCartItem('Boné', 50);
  sut.addItem(cartItem1);
  sut.addItem(cartItem2);

  return { sut, discountMock };
};

const createCartItem = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }

  return new CartItemMock(name, price);
};

describe('testing shopping cart', () => {
  afterEach(() => jest.clearAllMocks());
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('should be empty', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBeTruthy;
  });

  it('should have 2 items', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
  });

  it('should test total and totalWithDiscount', () => {
    const { sut } = createSutWithProducts();
    expect(sut.total()).toBe(120.5);
    expect(sut.totalWithDiscount()).toBe(120.5);
  });

  it('should remove one item', () => {
    const { sut } = createSutWithProducts();
    sut.removeItem(1);
    expect(sut.items.length).toBe(1);
    sut.removeItem(0);
    expect(sut.items.length).toBe(0);
  });

  it('should add products then clear cart', () => {
    const { sut } = createSutWithProducts();
    sut.clear();
    expect(sut.items.length).toBe(0);
  });

  it('should call discount.calculate(price) once when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });
  it('should call discount.calculate with total price once when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  });
});
