import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

import { Pagination } from '../../common/pagination';
import { Equipment } from '../../common/equipment';

@Injectable()
export class EquipmentService extends HttpService<Equipment> {

  private URL = 'equipment';

  getEquipmetList(pagination: Pagination<Equipment>, data: any) {
    const url = `${this.URL}/getEquipments/${pagination.current}/${pagination.size}`;
    return super.post(url, data);
  }

  addEquipment(data: Equipment) {
    const url = `${this.URL}/add/equipment`;
    return super.post(url, data);
  }

  updateEquipment(data: Equipment) {
    const url = `${this.URL}/update/equipment`;
    return super.post(url, data);
  }

  deleteEquipment(data: Equipment) {
    const url = `${this.URL}/delete/equipment`;
    return super.post(url, data);
  }

}
