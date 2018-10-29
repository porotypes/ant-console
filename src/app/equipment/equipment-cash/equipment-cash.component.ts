import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/common/pagination';
import { Equipment } from 'src/app/common/equipment';

@Component({
  selector: 'app-equipment-cash',
  templateUrl: './equipment-cash.component.html',
  styleUrls: ['./equipment-cash.component.css']
})
export class EquipmentCashComponent implements OnInit {

  private panelStyle = {
    'background': '#f7f7f7',
    'border-radius': '4px',
    'margin-bottom': '24px',
    'border': 'none'
  };
  fullPagination = new Pagination<Equipment>();
  emptyPagination = new Pagination<Equipment>();
  pagination = new Pagination<Equipment>();

  fullTableLoading = false;
  enptyTableLoading = false;
  tableLoading = false;

  constructor() { }

  ngOnInit() {
  }

}
