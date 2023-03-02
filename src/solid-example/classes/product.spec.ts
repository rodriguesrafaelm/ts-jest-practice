import { Product } from './product';

const createSUT = (name: string, price: number): Product => {
  return new Product(name, price);
};

describe('products', () => {
  afterEach(() => jest.clearAllMocks());
  it('should have properties name and price', () => {
    const sut = createSUT('Camiseta', 75.5);
    expect(sut).toHaveProperty('name', 'Camiseta');
    expect(sut.price).toBeCloseTo(75.5);
  });
});
