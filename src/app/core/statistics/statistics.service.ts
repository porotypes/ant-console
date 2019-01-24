import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { HttpService } from '../http.service';

import { Pagination } from 'src/app/common/pagination';
import { EquipmentStatistics } from 'src/app/common/Equipment-statistics';

@Injectable()
export class StatisticsService extends HttpService<EquipmentStatistics> {

  private URL = 'statistics';

  getEquipmentStatisticsList(condition: Object) {
    return super.post(this.URL, condition);
  }

  getFaultStatisticsList(condition: Object) {
    const url = `${this.URL}/getByEquipmentError`;
    return super.post(url, condition);
  }

  getFaultList(condition: Object) {
    const url = `/equipmentReceive/getByDeviceType`;
    return super.post(url, condition);
  }

  getDepositsList(condition: Object) {
    const url = `huobi/deposits`;
    return super.get(url + '?coin=' + condition['coin'] + '&from=' + condition['from'] + '&size=' + condition['size']);
  }

  getWithdrawalsList(condition: Object) {
    const url = `huobi/withdrawals`;
    return super.get(url + '?coin=' + condition['coin'] + '&from=' + condition['from'] + '&size=' + condition['size']);
  }

}
