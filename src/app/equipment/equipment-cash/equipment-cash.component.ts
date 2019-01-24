import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/common/pagination';
import { Equipment } from 'src/app/common/equipment';

@Component({
  selector: 'app-equipment-cash',
  templateUrl: './equipment-cash.component.html',
  styleUrls: ['./equipment-cash.component.css']
})
export class EquipmentCashComponent implements OnInit {

  public panelStyle = {
    'background': '#f7f7f7',
    'border-radius': '4px',
    'margin-bottom': '24px',
    'border': 'none'
  };
  public fullPagination = new Pagination<Equipment>();
  public emptyPagination = new Pagination<Equipment>();
  public pagination = new Pagination<Equipment>();

  public fullTableLoading = false;
  public emptyTableLoading = false;
  public tableLoading = false;

  constructor() { }

  ngOnInit() {
  }

}
