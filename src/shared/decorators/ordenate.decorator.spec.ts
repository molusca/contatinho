import { IOrderParams, Ordenate, Ordering } from './ordenate.decorator';
import { getParamDecoratorFactory } from './paginate.decorator.spec';

describe('Ordenate', () => {
  const stringOrder = '{"column":"coluna1","dir":"DESC"}';
  const stringOrderEmptyProps = '{"column":"","dir":""}';

  const defaultOrder: IOrderParams = {
    column: 'id',
    dir: 'ASC',
  };

  const order: IOrderParams = {
    column: 'coluna1',
    dir: 'DESC',
  };

  const executionContext = {
    switchToHttp: () => ({
      getRequest: () => ({ query: { order: stringOrder } }),
    }),
  } as any;

  it('should return default object if there is no JSON', () => {
    expect(new Ordering('')).toEqual(defaultOrder);
  });

  it('should return OrderParams object with values for order', () => {
    expect(new Ordering(stringOrder)).toEqual(order);
  });

  it('should return default values when obj has empty props', () => {
    expect(new Ordering(stringOrderEmptyProps)).toEqual(defaultOrder);
  });

  it('should be Ordenate using factory', () => {
    const factory = getParamDecoratorFactory(Ordenate);
    const result = factory(null, executionContext);
    expect(result).toEqual(new Ordering(stringOrder));
  });
});
