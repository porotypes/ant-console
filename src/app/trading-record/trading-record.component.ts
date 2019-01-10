import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '../../environments/environment';

import { TradingRecordService } from '../core/trading-record/trading-record.service';
import { EquipmentService } from '../core/equipment/equipment.service';
import { LoginService } from '../core/auth/login.service';

import { Pagination } from '../common/pagination';
import { TradingRecord } from '../common/trading-record';
import { Equipment } from 'src/app/common/equipment';
import { HttpResponseData } from '../common/http-response-data';

@Component({
  selector: 'app-trading-record',
  templateUrl: './trading-record.component.html',
  styleUrls: ['./trading-record.component.css']
})
export class TradingRecordComponent implements OnInit {

  pagination = new Pagination<TradingRecord>();
  paginationE = new Pagination<Equipment>();
  tableLoading = false;
  transactionId: string;
  isVisible = false;
  modalTableLoading = false;
  modalData: Array<any> = [];

  constructor(
    private tradingRecordService: TradingRecordService,
    private equipmentService: EquipmentService,
    private loginService: LoginService,
    private messageService: NzMessageService,
  ) { }

  ngOnInit() {
    this.getEquipmentList();
    // this.getTradingRecordList();
  }

  // 获取设备列表
  getEquipmentList() {
    const query = {
      status: ''
    };
    this.tableLoading = true;
    this.equipmentService.getEquipmetList(this.paginationE, query).subscribe(
      (res: Pagination<Equipment>) => {
        this.paginationE = res;
        this.getTradingRecordList();
        this.tableLoading = false;
      },
      error => {
        this.tableLoading = false;
        this.messageService.error(error.error.msg);
      }
    );
  }

  getTradingRecordList() {
    this.tableLoading = true;
    this.tradingRecordService.getTradingRecordList(this.pagination).subscribe(
      (res: HttpResponseData<Pagination<TradingRecord>>) => {
        if (res.status === 200 && res.obj) {
          res.obj.records.forEach((e, k) => {
            res.obj.records[k].equipmentName = '';
            this.paginationE.records.forEach(i => {
              if (i.equipmentId !== '') {
                if (i.equipmentId === e.equipmentId) {
                  res.obj.records[k].equipmentName = i.equipmentName;
                }
              }
            }
            );
          });
          this.pagination = res.obj;
        } else {
          this.messageService.error(res.msg);
        }
        this.tableLoading = false;
      },
      error => {
        this.tableLoading = false;
        if (error.error.status === 401) {
          this.loginService.loginOut();
        }
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
      this.pagination.current = event;
    }
    this.tableLoading = true;
    this.getTradingRecordList();
  }

  exportExcel() {
    this.tradingRecordService.exportTradingRecordList(this.pagination).subscribe(
      (res: Blob) => {
        const file = new Blob([res], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(file);
        window.open(url);
      }
    );
  }

  // 打开modal框
  showModal(id: number) {
    this.tradingRecordService.getStatus(id).subscribe(
      (res: HttpResponseData<any>) => {
        if (res.status === 200 && res.obj) {
          this.modalData = [];
          Object.keys(res.obj).forEach(e => {
            this.modalData.push({ title: e, data: res.obj[e] });
          });
          this.isVisible = true;
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        if (error.error.status === 401) {
          this.loginService.loginOut();
        }
        this.messageService.error(error.error.msg);
      }
    );
  }

  // modal开关
  handleCancelOrOk(): void {
    this.isVisible = false;
  }

}
