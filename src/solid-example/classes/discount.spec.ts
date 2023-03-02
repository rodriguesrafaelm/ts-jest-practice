import {
  FiftyPercentDiscount,
  TenPercentDiscount,
  NoDiscount,
  Discount,
} from './discount';

const createSUT = (className: new () => Discount) => {
  return new className();
};
const price = 100;

describe('discounts', () => {
  afterEach(() => jest.clearAllMocks());
  it('should return price with TenPercentDiscount', () => {
    const sut = createSUT(TenPercentDiscount).calculate(price);
    expect(sut).toBeCloseTo(90);
  });
  it('should return price with FiftyPercentDiscount', () => {
    const sut = createSUT(FiftyPercentDiscount).calculate(price);
    expect(sut).toBeCloseTo(50);
  });
  it('should return price with NoDiscount', () => {
    const sut = createSUT(NoDiscount).calculate(price);
    expect(sut).toBeCloseTo(100);
  });
});
