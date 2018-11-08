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

}
