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

  selectedCurrencyType1: string;
  selectedCurrencyType2: string;

  currencyType = [
    { name: 'USDT', en: 'USDT', value: 'usdt' },
    { name: 'BTC', en: 'BTC', value: 'btc' },
    { name: 'ETH', en: 'ETH', value: 'eth' },
    { name: '人民币', en: 'CNY', value: 'cny' },
    { name: '美元', en: 'USD', value: 'usd' },
    { name: '新元', en: 'SGD', value: 'sgd' },
    { name: '卢比', en: 'INR', value: 'inr' },
    { name: '越南盾', en: 'VND', value: 'vnd' },
    { name: '加元', en: 'CAD', value: 'cad' },
    { name: '澳元', en: 'AUD', value: 'aud' },
    { name: '韩元', en: 'KRW', value: 'krw' },
    { name: '瑞郎', en: 'CHF', value: 'chf' },
    { name: '新台币', en: 'TWD', value: 'twd' },
    { name: '卢布', en: 'RUB', value: 'rub' },
    { name: '英镑', en: 'GBP', value: 'gbp' },
    { name: '港元', en: 'HKD', value: 'hkd' },
    { name: '欧元', en: 'EUR', value: 'eur' },
    { name: '奈拉', en: 'NGN', value: 'ngn' },
    { name: '印尼卢比', en: 'IDR', value: 'idr' },
    { name: '菲律宾比索', en: 'PHP', value: 'php' },
    { name: '瑞尔', en: 'KHR', value: 'khr' },
    { name: '巴西雷亚尔', en: 'BRL', value: 'brl' },
    { name: '沙特里亚尔', en: 'SAR', value: 'sar' },
    { name: '迪拉姆', en: 'AED', value: 'aed' },
    { name: '马来西亚令吉', en: 'MYR', value: 'myr' },
    { name: '新土耳其里拉', en: 'TRY', value: 'try' }
  ];

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

  searchOrders() {
    console.log(1234);
  }

}
