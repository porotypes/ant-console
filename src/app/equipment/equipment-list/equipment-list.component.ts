import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { EquipmentService } from '../../core/equipment/equipment.service';

import { Pagination } from 'src/app/common/pagination';
import { Equipment } from 'src/app/common/equipment';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  private panelStyle = {
    'background': '#f7f7f7',
    'border-radius': '4px',
    'margin-bottom': '24px',
    'border': 'none'
  };
  pagination = new Pagination<Equipment>();
  tableLoading = false;
  selectedStatus = '0';

  constructor(
    private equipmentService: EquipmentService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getEquipmentList();
  }

  getEquipmentList(status: number = 0) {
    const query = {
      status: status
    };
    this.tableLoading = true;
    this.equipmentService.getEquipmetList(this.pagination, query).subscribe(
      (res: Pagination<Equipment>) => {
        this.tableLoading = false;
        this.pagination = res;
      },
      error => {
        this.tableLoading = false;
        this.messageService.error(error.error.msg);
      }
    );
  }

  changePageOrSize(resetPageIndex = false) {
    if (resetPageIndex) {
      this.pagination.current = 1;
    }
    this.getEquipmentList();
    console.log(1);
  }

  changeStatus(status) {
    this.getEquipmentList(+status);
  }

}
