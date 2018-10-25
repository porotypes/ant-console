export class Pagination<T> {
  offset: number;
  limit: number;
  total: number;
  size = 10;
  pages: string;
  current = 1;
  searchCount: boolean;
  openSort: boolean;
  ascs: any;
  descs: any;
  orderByField: any;
  records: T[];
  condition: any;
  asc: boolean;
}
