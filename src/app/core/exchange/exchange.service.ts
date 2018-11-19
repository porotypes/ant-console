import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable()
export class ExchangeService extends HttpService<any> {

  private URL = 'huobi';

  getHuobiAccount() {
    const url = `${this.URL}/accounts`;
    return super.get(url);
  }

  // 获取资产数据
  getHuobiBalance() {
    const url = `${this.URL}/balance`;
    return super.get(url);
  }

  // 获取委托订单
  getHuobiOrders(currencyPair: Object) {
    const url = `${this.URL}/orders?symbol=${currencyPair['symbol']}&start=${currencyPair['start']}
    &end=${currencyPair['end']}&direct=prev&size=${currencyPair['size']}`;
    return super.get(url);
  }

  // 买入
  buyMarketOrders(currencyPair: Object) {
    const url = `${this.URL}/order/buy-market?symbol=${currencyPair['symbol']}&amount=${currencyPair['amount']}`;
    console.log(url);
    // return super.get(url);
    return super.get('');
  }

  // 卖出
  sellMarketOrders(currencyPair: Object) {
    const url = `${this.URL}/order/sell-market?symbol=${currencyPair['symbol']}&amount=${currencyPair['amount']}`;
    console.log(url);
    // return super.get(url);
    return super.get('');
  }

  // 提币
  withdrawal(currencyPair: Object) {
    const url = `${this.URL}/order/withdrawal?
    coin=${currencyPair['coin']}&amount=${currencyPair['amount']}&address=${currencyPair['address']}`;
    console.log(url);
    // return super.get(url);
    return super.get('');
  }

  // 撤销订单
  cancel(id: number) {
    const url = `${this.URL}/order/cencel?id=${id}`;
    console.log(url);
    // return super.get(url);
    return super.get('');
  }

    // 撤销订单
    cancelWithdraw(id: number) {
      const url = `${this.URL}/order/withdrawalcancel?id=${id}`;
      console.log(url);
      // return super.get(url);
      return super.get('');
    }

}
