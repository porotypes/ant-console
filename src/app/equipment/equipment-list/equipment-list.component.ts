import { Component, OnInit } from '@angular/core';
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
  abnormalPagination = new Pagination<Equipment>();

  tableLoading = false;
  abnormalAbleLoading = false;

  constructor() { }

  ngOnInit() {
  }

}
