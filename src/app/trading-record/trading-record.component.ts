import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '../../environments/environment';

import { TradingRecordService } from '../core/trading-record/trading-record.service';

import { Pagination } from '../common/pagination';
import { TradingRecord } from '../common/trading-record';
import { HttpResponseData } from '../common/http-response-data';

@Component({
  selector: 'app-trading-record',
  templateUrl: './trading-record.component.html',
  styleUrls: ['./trading-record.component.css']
})
export class TradingRecordComponent implements OnInit {

  pagination = new Pagination<TradingRecord>();
  tableLoading = false;
  transactionId: string;

  constructor(
    private tradingRecordService: TradingRecordService,
    private messageService: NzMessageService,
  ) { }

  ngOnInit() {
    this.getTradingRecordList();
  }

  getTradingRecordList() {
    this.tableLoading = true;
    this.tradingRecordService.getTradingRecordList(this.pagination).subscribe(
      (res: HttpResponseData<Pagination<TradingRecord>>) => {
        this.tableLoading = false;
        if (res.status === 200 && res.obj) {
          this.pagination = res.obj;
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.tableLoading = false;
        this.messageService.error(error.error.msg);
      }
    );
  }

  searchTradingRecord() {
    if (this.transactionId.trim() !== '') {
      this.pagination['transactionId'] = [this.transactionId];
      this.getTradingRecordList();
    } else {
      this.pagination['transactionId'] = null;
      this.getTradingRecordList();
    }
  }

  changePageOrSize(event, resetPageIndex = false) {
    if (event === 0) {
      return;
    }
    if (resetPageIndex) {
      this.pagination.current = 1;
    }
    this.tableLoading = true;
    this.getTradingRecordList();
  }

  exportExcel() {
    this.tradingRecordService.exportTradingRecordList(this.pagination).subscribe(
      (res: Blob) => {
        const file = new Blob([res], {type: 'application/vnd.ms-excel'});
        const url = URL.createObjectURL(file);
        window.open(url);
      }
    );
  }

}
