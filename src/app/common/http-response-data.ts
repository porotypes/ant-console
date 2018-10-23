export class HttpResponseData<T> {
  success: boolean;
  status: number;
  msg: string;
  obj: T;
}
