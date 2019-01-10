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

  getEquipment(id: number) {
    const url = `${this.URL}/${id}`;
    return super.get(url);
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
    const url = `${this.URL}`;
    return super.deleted(url, data);
  }

  downloadExcel(): string {
    return `${super.getBaseUrl()}equipments.xls`;
  }

  uploadExcel(file: FormData) {
    const url = `${this.URL}/upload/equipments`;
    return super.post(url, file);
  }

}
