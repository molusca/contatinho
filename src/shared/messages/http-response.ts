import { IResponse } from '../interfaces/response.interface';

export class HttpResponse<T = unknown> implements IResponse<T> {
  message = '';
  data!: T | null | undefined;

  constructor(data: T | null | undefined, message = '') {
    this.data = data;
    this.message = message;
  }

  onCreated(): IResponse<T> {
    this.message = 'MESSAGES.SAVE-SUCCESS';
    return this;
  }

  onUpdated(): IResponse<T> {
    this.message = 'MESSAGES.UPDATE-SUCCESS';
    return this;
  }

  onDeleted(): IResponse<T> {
    this.message = 'MESSAGES.DELETE-SUCCESS';
    return this;
  }
}
