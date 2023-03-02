import { Persistence } from './persistence';

const createSUT = () => {
  return new Persistence();
};

describe('persistence', () => {
  afterEach(() => jest.clearAllMocks());
  it('should return undefined', () => {
    const sut = createSUT();
    expect(sut.saveOrder()).toBeUndefined();
  });
  it('should call console log once', () => {
    const sut = createSUT();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveOrder();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
  it('should call console log with Pedido salvo com sucesso', () => {
    const sut = createSUT();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveOrder();
    expect(consoleSpy).toHaveBeenCalledWith('Pedido salvo com sucesso');
  });
});
