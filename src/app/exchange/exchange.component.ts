import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { ExchangeService } from '../core/exchange/exchange.service';

import { Account } from '../common/exchange/account';
import { Balance } from '../common/exchange/balance';
import { HttpResponseData } from '../common/http-response-data';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  accounts: Account[];
  balances: Balance[] = [];
  balancesList: Balance[];
  balanceTableLoading = false;
  balancePageIndex = 1;
  balanceTotal: number;

  constructor(
    private exchangeService: ExchangeService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getHuobiAccount();
    this.getHuobiBalance();
  }

  getHuobiAccount() {
    this.exchangeService.getHuobiAccount().subscribe(
      (res: HttpResponseData<string>) => {
        const obj = JSON.parse(res.obj);
        if (obj['status'] && obj['status'] < 0) {
          this.messageService.error('获取数据失败');
        } else {
          this.accounts = obj;
        }
      },
      error => {
        this.messageService.error(error.error.msg || '响应超时');
      }
    );
  }

  getHuobiBalance() {
    this.balanceTableLoading = true;
    this.exchangeService.getHuobiBalance().subscribe(
      (res: HttpResponseData<string>) => {
        const obj = JSON.parse(res.obj);
        this.balanceTableLoading = false;
        if (obj['status'] && obj['status'] < 0) {
          this.messageService.error('获取数据失败');
        } else {
          obj.list.forEach(balance => {
            this.balances.push(balance);
          });
          this.paginationBalances();
        }
      },
      error => {
        this.balanceTableLoading = false;
        this.messageService.error(error.error.msg || '响应超时');
      }
    );
  }

  paginationBalances() {
    this.balanceTotal = this.balances.length / 10;
    this.balancesList = this.balances.slice(0, 10);
  }

  changeBalanceIndex(index) {
    if (index === 1) {
      this.balancesList = this.balances.slice(0, 10);
      return;
    }
    this.balancesList = this.balances.slice((index - 1) * 10, 10 * index);
    this.balancePageIndex = index;
  }

}
