import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { isJsonString } from '../helpers/string-helpers';

export type OrderingDir = 'ASC' | 'DESC';

export interface IOrderParams {
  column: string;
  dir: OrderingDir;
}

export class Ordering implements IOrderParams {
  column: string;
  dir: OrderingDir;

  constructor(query: string) {
    const orderObj = this.buildOrderParams(query);
    this.column = orderObj.column;
    this.dir = orderObj.dir;
  }

  private buildOrderParams(order: string): IOrderParams {
    if (isJsonString(order)) {
      const orderObj = JSON.parse(order) as IOrderParams;

      if (orderObj.column.length === 0) {
        orderObj.column = 'id';
      }

      if (orderObj.dir.length === 0) {
        orderObj.dir = 'ASC';
      }

      return orderObj;
    }
    return {
      column: 'id',
      dir: 'ASC',
    } as IOrderParams;
  }
}

export const Ordenate = createParamDecorator(
  (data: unknown, context: ExecutionContext): Ordering => {
    const http = context.switchToHttp() as { getRequest: () => unknown };
    const req = http.getRequest() as { query: { order: string } };
    return new Ordering(req.query.order);
  },
);
