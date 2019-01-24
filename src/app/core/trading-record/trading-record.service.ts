import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpResponseData } from 'src/app/common/http-response-data';
import { TradingRecord } from 'src/app/common/trading-record';
import { Pagination } from 'src/app/common/pagination';
import { Observable } from 'rxjs';

@Injectable()
export class TradingRecordService extends HttpService<HttpResponseData<Pagination<TradingRecord>>> {

  private URL = 'transactionDetail';

  getTradingRecordList(pagination: Pagination<TradingRecord>) {
    const url = `${this.URL}/statistics`;
    return super.post(url, pagination);
  }

  exportTradingRecordList(pagination: Pagination<TradingRecord>): Observable<Blob> {
    const url = `${this.URL}/transactionxport`;
    return super.download(url, pagination);
  }

  getStatus(id: number) {
    const url = `${this.URL}/transactionFailed/${id}`;
    return super.get(url);
  }

}
