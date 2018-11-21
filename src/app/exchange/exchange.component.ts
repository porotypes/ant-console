import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { ExchangeService } from '../core/exchange/exchange.service';
import { DateTimeUtil } from '../shared/date-time-util';
import { format, subDays } from 'date-fns';

import { StatisticsService } from '../core/statistics/statistics.service';
import { AssetStatistics } from '../common/asset-statistics';
import { LanguageService } from '../core/language.service';

import { Account } from '../common/exchange/account';
import { Order } from '../common/exchange/order';
import { Balance } from '../common/exchange/balance';
import { HttpResponseData } from '../common/http-response-data';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  accounts: Account[];
  orders: Order[] = [];

  balances: Balance[] = [];
  balancesList: Balance[];
  balancePageIndex = 1;
  balanceTotal: number;

  balanceTableLoading = false;  // 资产loading
  transactionTableLoading = false;  // 交易记录查询loading
  withdrawalsTableLoading = false;  // 提币记录查询loading
  cancelOrderLoading = false;  // 交易订单撤销loading
  cancelWithdrawalsLoading = false;  // 提币订单撤销loading

  selectedCurrencyType1: string;
  selectedCurrencyType2: string;
  startTimeValue: Date = new Date();
  endTimeValue: Date = new Date();
  sizeNum = 100;

  selectedCurrencyW = 'btc'; // 提币查询默认选择币种
  fromNumW = 0;
  sizeNumW = 100;

  withdrawalsList: AssetStatistics[] = [];

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
    private statisticsService: StatisticsService,
    private exchangeService: ExchangeService,
    private messageService: NzMessageService,
    private languageService: LanguageService
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

  // 查询资产
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
            if (balance.balance !== '0') {
              this.balances.push(balance);
            }
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

  // 查询订单
  searchOrders() {
    this.transactionTableLoading = true;
    const currncyPair = {
      symbol: this.selectedCurrencyType1 + this.selectedCurrencyType2,
      start: format(this.startTimeValue, 'YYYY-MM-DD'),
      end: format(this.endTimeValue, 'YYYY-MM-DD'),
      size: this.sizeNum
    };
    this.exchangeService.getHuobiOrders(currncyPair).subscribe(
      (res: HttpResponseData<string>) => {
        const obj = JSON.parse(res.obj);
        if (obj['status'] && obj['status'] < 0) {
          this.messageService.error('获取数据失败');
        } else {
          this.orders = [];
          obj.forEach(balance => {
            balance.fieldAmount = balance['field-amount'];
            balance.finishedAt = balance['finished-at'];
            this.orders.push(balance);
          });
        }
        this.transactionTableLoading = false;
      },
      error => {
        this.transactionTableLoading = false;
        this.messageService.error(error.error.msg || '响应超时');
      }

    );
  }

  // 买入
  buyMarket(symbol: string, amount: number) {
    const currncyPair = {
      symbol: symbol,
      amount: amount
    };
    this.exchangeService.buyMarketOrders(currncyPair).subscribe(
      (res: HttpResponseData<string>) => {
        const obj = JSON.parse(res.obj);
        if (obj['status'] && obj['status'] < 0) {
          this.messageService.error('获取数据失败');
        } else {
          this.orders = [];
          obj.forEach(balance => {
            console.log(balance);
            balance.fieldAmount = balance['field-amount'];
            balance.finishedAt = balance['finished-at'];
            this.orders.push(balance);
          });
          console.log(this.orders);
        }
      },
      error => {
        this.messageService.error(error.error.msg || '响应超时');
      }

    );
  }

  // 卖出
  sellMarket(symbol: string, amount: number) {
    const currncyPair = {
      symbol: symbol,
      amount: amount
    };
    this.exchangeService.sellMarketOrders(currncyPair).subscribe(
      (res: HttpResponseData<string>) => {
        const obj = JSON.parse(res.obj);
        if (obj['status'] && obj['status'] < 0) {
          this.messageService.error('获取数据失败');
        } else {
          this.orders = [];
          obj.forEach(balance => {
            console.log(balance);
            balance.fieldAmount = balance['field-amount'];
            balance.finishedAt = balance['finished-at'];
            this.orders.push(balance);
          });
          console.log(this.orders);
        }
      },
      error => {
        this.messageService.error(error.error.msg || '响应超时');
      }

    );
  }

  // 提币
  withdrawal(coin: string, amount: number, address: string) {
    const currncyPair = {
      coin: coin,
      amount: amount,
      address: address
    };
    this.exchangeService.withdrawal(currncyPair).subscribe(
      (res: HttpResponseData<string>) => {
        const obj = JSON.parse(res.obj);
        if (obj['status'] && obj['status'] < 0) {
          this.messageService.error('获取数据失败');
        } else {
          this.orders = [];
          obj.forEach(balance => {
            console.log(balance);
            balance.fieldAmount = balance['field-amount'];
            balance.finishedAt = balance['finished-at'];
            this.orders.push(balance);
          });
        }
      },
      error => {
        this.messageService.error(error.error.msg || '响应超时');
      }

    );
  }

  // 查询提币订单
  withdrawalsSearch(coin: string, from: number, size: number) {
    this.withdrawalsTableLoading = true;
    const condition = {
      coin: coin || this.selectedCurrencyW,
      from: from || this.fromNumW,
      size: size || this.sizeNumW
    };
    this.statisticsService.getWithdrawalsList(condition).subscribe(
      (res: HttpResponseData<string>) => {
        if (res.status === 200) {
          const obj = JSON.parse(res.obj);
          console.log(obj);
          this.withdrawalsList = [];
          obj.forEach(val => {
            val.createdAt = val['created-at'];
            val.txHash = val['tx-hash'];
            val.updatedAt = val['updated-at'];
            this.fromNumW = val.id + 1;
            this.withdrawalsList.push(val);
          });
        } else {
          this.messageService.error(res.msg);
        }
        this.withdrawalsTableLoading = false;
      },
      error => {
        this.withdrawalsTableLoading = false;
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

  fromNumWClear() {
    this.fromNumW = 0;
  }

  // 撤销订单
  cancelOrder(id: number) {
    this.cancelOrderLoading = true;
    this.exchangeService.cancel(id).subscribe(
      (res: HttpResponseData<string>) => {
        const obj = JSON.parse(res.obj);
        if (obj['status'] && obj['status'] < 0) {
          this.messageService.error('获取数据失败');
        } else {
          console.log(obj);
          this.messageService.success(obj);
        }
        this.cancelOrderLoading = false;

      },
      error => {
        this.cancelOrderLoading = false;
        this.messageService.error(error.error.msg || '响应超时');
      }

    );
  }

  // 撤销提币订单
  cancelWithdraw(id: number) {
    this.cancelWithdrawalsLoading = true;
    this.exchangeService.cancelWithdraw(id).subscribe(
      (res: HttpResponseData<string>) => {
        const obj = JSON.parse(res.obj);
        if (obj['status'] && obj['status'] < 0) {
          this.messageService.error('获取数据失败');
        } else {
          console.log(obj);
          this.messageService.success(obj);
        }
        this.cancelWithdrawalsLoading = false;
      },
      error => {
        this.cancelWithdrawalsLoading = false;
        this.messageService.error(error.error.msg || '响应超时');
      }

    );
  }
}
