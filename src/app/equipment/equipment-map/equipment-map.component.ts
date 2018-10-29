import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var BMap: any;

@Component({
  selector: 'app-equipment-map',
  templateUrl: './equipment-map.component.html',
  styleUrls: ['./equipment-map.component.css']
})
export class EquipmentMapComponent implements OnInit, AfterViewInit {

  map: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    this.map = new BMap.Map('map');
    this.map.centerAndZoom('太平洋', 1);
    this.map.enableScrollWheelZoom(true);
  }

}
