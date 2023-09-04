export interface IResponsePaginate<T> {
  data: T | Array<T>;
  count: number;
  pageSize: number;
}
