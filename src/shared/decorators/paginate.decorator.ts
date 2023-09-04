import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IPaginationParams {
  offset: number;
  limit: number;
}

export class Pagination implements IPaginationParams {
  offset!: number;
  limit!: number;

  constructor(query: IPaginationParams) {
    this.offset = query.offset;
    this.limit = query.limit;
  }
}

export const Paginate = createParamDecorator(
  (data: unknown, context: ExecutionContext): Pagination => {
    const http = context.switchToHttp() as { getRequest: () => unknown };
    const req = http.getRequest() as { query: IPaginationParams };
    return new Pagination(req.query);
  },
);
