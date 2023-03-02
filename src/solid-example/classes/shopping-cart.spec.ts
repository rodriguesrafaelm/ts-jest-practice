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
  });
});
