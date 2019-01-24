import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { StatisticsService } from '../../core/statistics/statistics.service';
import { DateTimeUtil } from '../../shared/date-time-util';
import { AuthService } from '../../core/auth/auth.service';
import { LanguageService } from '../../core/language.service';
import { LoginService } from '../../core/auth/login.service';

import { AssetStatistics } from '../../common/asset-statistics';
import { HttpResponseData } from 'src/app/common/http-response-data';
import { Pagination } from 'src/app/common/pagination';
import { Company } from 'src/app/common/company';

@Component({
  selector: 'app-asset-statistics',
  templateUrl: './asset-statistics.component.html',
  styleUrls: ['./asset-statistics.component.css']
})
export class AssetStatisticsComponent implements OnInit {

  statisticsList: AssetStatistics[] = [];
  withdrawalsList: AssetStatistics[] = [];

  tableLoadingD = false;
  tableLoadingW = false;

  selectedCurrencyD = 'btc';
  fromNumD = 0;
  sizeNumD = 100;
  selectedCurrencyW = 'btc';
  fromNumW = 0;
  sizeNumW = 100;

  constructor(
    private statisticsService: StatisticsService,
    private messageService: NzMessageService,
    private languageService: LanguageService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
  }

  // 查询提币订单
  withdrawalsSearch(coin: string = 'btc', from: number = 0, size: number = 100) {
    this.tableLoadingW = true;
    const condition = {
      coin: coin || this.selectedCurrencyW,
      from: from || this.fromNumW,
      size: size || this.sizeNumW
    };
    this.statisticsService.getWithdrawalsList(condition).subscribe(
      (res: HttpResponseData<string>) => {
        if (res.status === 200) {
          const obj = JSON.parse(res.obj);
          console.log(obj);
          this.withdrawalsList = [];
          obj.forEach(val => {
            val.createdAt = val['created-at'];
            val.txHash = val['tx-hash'];
            val.updatedAt = val['updated-at'];
            this.fromNumW = val.id + 1;
            this.withdrawalsList.push(val);
          });
        } else {
          this.messageService.error(res.msg);
        }
        this.tableLoadingW = false;
      },
      error => {
        this.tableLoadingW = false;
        if (error.error.status === 401) {
          this.loginService.loginOut();
        }
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

  // 查询充值订单
  depositsSearch(coin: string, from: number, size: number) {
    this.tableLoadingD = true;
    const condition = {
      coin: coin || this.selectedCurrencyD,
      from: from || this.fromNumD,
      size: size || this.sizeNumD
    };
    condition.size = condition.size > 100 ? 100 : condition.size;
    this.statisticsService.getDepositsList(condition).subscribe(
      (res: HttpResponseData<string>) => {
        if (res.status === 200) {
          const obj = JSON.parse(res.obj);
          this.statisticsList = [];
          obj.forEach(val => {
            val.createdAt = val['created-at'];
            val.txHash = val['tx-hash'];
            val.updatedAt = val['updated-at'];
            this.fromNumD = val.id + 1;
            this.statisticsList.push(val);
          });

        } else {
          this.messageService.error(res.msg);
        }
        this.tableLoadingD = false;
      },
      error => {
        this.tableLoadingD = false;
        if (error.error.status === 401) {
          this.loginService.loginOut();
        }
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

}
