import { Component, OnInit } from '@angular/core';

import { ExchangeService } from '../core/exchange/exchange.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  constructor(
    private exchangeService: ExchangeService
  ) { }

  ngOnInit() {
    this.getHuobiAccount();
  }

  getHuobiAccount() {
    this.exchangeService.getHuobiAccount().subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
