export class FaultList {
  id: number;
  offset: number;
  limit: number;
  total: number;
  size: number;
  pages: number;
  current: number;
  searchCount: boolean;
  openSort: boolean;
  ascs: null;
  descs: null;
  orderByField: null;
  records: Array<any>;
  condition: null;
  asc: boolean;
}
