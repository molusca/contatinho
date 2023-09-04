import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

import { Paginate, Pagination } from './paginate.decorator';

const query: any = {
  length: 10,
  start: 1,
  dir: 'ASC',
  order: 'id',
  search: '',
  skip: 0,
};

const executionContext = {
  switchToHttp: () => ({
    getRequest: () => ({ query }),
  }),
} as any;

export function getParamDecoratorFactory(decorator: Function) {
  class Test {
    // @ts-ignore
    public test(@decorator() value: any) {}
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}

describe('Pagination', () => {
  it('should be defined', () => {
    expect(new Pagination(query)).toBeDefined();
  });

  it('should be Paginate', () => {
    const factory = getParamDecoratorFactory(Paginate);
    const result = factory(null, executionContext);
    expect(result).toEqual(new Pagination(query));
  });
});
