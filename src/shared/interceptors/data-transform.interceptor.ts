import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNil } from '../helpers/object-helpers';
import { IResponse } from '../interfaces/response.interface';

@Injectable()
export class DataTransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(map((returned) => this.formatData(returned)));
  }

  formatData(returned: unknown): IResponse<T> {
    const data = returned as IResponse<T>;
    const dataResponse = {
      message: data.message ?? null,
      data: data.data ?? data,
    };

    if (!isNil(data.count)) {
      Object.assign(dataResponse, { count: data.count });
    }

    if (!isNil(data.pageSize)) {
      Object.assign(dataResponse, { pageSize: data.pageSize });
    }

    return dataResponse as IResponse<T>;
  }
}
