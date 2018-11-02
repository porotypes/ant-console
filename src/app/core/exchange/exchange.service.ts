import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable()
export class ExchangeService extends HttpService<any> {

  private URL = 'huobi';

  getHuobiAccount() {
    const url = `${this.URL}/accounts`;
    return super.get(url);
  }

}
