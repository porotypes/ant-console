import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { StatisticsService } from '../../core/statistics/statistics.service';
import { DateTimeUtil } from '../../shared/date-time-util';
import { CompanyService } from '../../core/system/company.service';
import { AuthService } from '../../core/auth/auth.service';
import { LanguageService } from '../../core/language.service';

import { EquipmentStatistics } from '../../common/Equipment-statistics';
import { HttpResponseData } from 'src/app/common/http-response-data';
import { Pagination } from 'src/app/common/pagination';
import { Company } from 'src/app/common/company';

@Component({
  selector: 'app-company-statistics',
  templateUrl: './company-statistics.component.html',
  styleUrls: ['./company-statistics.component.css']
})
export class CompanyStatisticsComponent implements OnInit {

  startTimeValue: Date;
  endTimeValue: Date;
  selectedCompany: number;
  statisticsList: EquipmentStatistics[];
  tableLoading = false;
  pagination = new Pagination<Company>();
  companies: Company[];

  disabledStartDate = (startTimeValue: Date): boolean => {
    if (!startTimeValue || !this.endTimeValue) {
      return false;
    }
    return startTimeValue.getTime() > this.endTimeValue.getTime();
  }

  disabledEndDate = (endTimeValue: Date): boolean => {
    if (!endTimeValue || !this.startTimeValue) {
      return false;
    }
    return endTimeValue.getTime() <= this.startTimeValue.getTime();
  }

  constructor(
    private statisticsService: StatisticsService,
    private messageService: NzMessageService,
    private companyService: CompanyService,
    public authService: AuthService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    if (this.authService.isAdmin()) {
      this.getAllCompanies();
    }
  }

  getEquipmentStatisticsList() {
    // if (!this.selectedCompany) {
    //   this.messageService.warning('请选择公司');
    //   return;
    // }
    const condition = {
      companyId: this.selectedCompany,
      startTime: DateTimeUtil.formatDateTimeToString(this.startTimeValue),
      endTime: DateTimeUtil.formatDateTimeToString(this.endTimeValue),
      statisticsType: 0
    };
    this.tableLoading = true;
    this.statisticsService.getEquipmentStatisticsList(condition).subscribe(
      (res: HttpResponseData<EquipmentStatistics[]>) => {
        this.tableLoading = false;
        if (res.status === 200) {
          this.statisticsList = res.obj;
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.tableLoading = false;
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

  getAllCompanies() {
    this.pagination.size = 9999999;
    this.companyService.getCompanyList(this.pagination).subscribe(
      (res: HttpResponseData<Pagination<Company>>) => {
        if (res.status === 200) {
          this.companies = res.obj.records;
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

  search() {
    this.getEquipmentStatisticsList();
  }

}
