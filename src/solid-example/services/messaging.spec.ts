import { Messaging } from './messaging';

const createSUT = () => {
  return new Messaging();
};
const message = 'test message';

describe('messaging', () => {
  afterEach(() => jest.clearAllMocks());
  it('should', () => {
    const sut = createSUT();
    expect(sut.sendMessage(message)).toBeUndefined();
  });
  it('should call console log once', () => {
    const sut = createSUT();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage(message);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
  it('should call console log with desired message', () => {
    const sut = createSUT();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage(message);
    expect(consoleSpy).toHaveBeenCalledWith('Mensagem enviada: ', message);
  });
});
