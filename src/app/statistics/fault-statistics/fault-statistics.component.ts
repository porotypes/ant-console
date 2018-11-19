import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { StatisticsService } from '../../core/statistics/statistics.service';
import { DateTimeUtil } from '../../shared/date-time-util';
import { CompanyService } from '../../core/system/company.service';
import { AuthService } from '../../core/auth/auth.service';
import { LanguageService } from '../../core/language.service';

import { Company } from 'src/app/common/company';
import { FaultStatistics } from 'src/app/common/fault-statistics';
import { HttpResponseData } from 'src/app/common/http-response-data';
import { Pagination } from 'src/app/common/pagination';
import { FaultList } from 'src/app/common/fault-list';

@Component({
  selector: 'app-fault-statistics',
  templateUrl: './fault-statistics.component.html',
  styleUrls: ['./fault-statistics.component.css']
})
export class FaultStatisticsComponent implements OnInit {

  startTimeValue = DateTimeUtil.getStartTimeString(new Date());
  endTimeValue = DateTimeUtil.getEndTimeString(new Date());
  selectedType = '0';
  selectedCompany = '';
  tableLoading = false;
  companies: Company[];
  statisticsList: FaultStatistics[];
  pagination = new Pagination<Company>();

  isVisible = false;
  data: FaultList[];

  showFaultListModal(eId: number, eType: string, status: number): void {
    this.isVisible = true;
    // 查询故障详情
    const condition = {
      companyId: '1',
      equipmentId: eId,
      statusCode: status,
      startTime: DateTimeUtil.formatDateTimeToString(this.startTimeValue),
      endTime: DateTimeUtil.formatDateTimeToString(this.endTimeValue),
      deviceType: eType
    };
    this.tableLoading = true;
    this.statisticsService.getFaultList(condition).subscribe(
      (res: HttpResponseData<FaultList>) => {
        this.tableLoading = false;
        if (res.status === 200) {
          this.data = res.obj.records;
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

  // 故障详情框关闭
  handleCancelOrOk(): void {
    this.isVisible = false;
  }

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
    this.getAllCompanies();
  }

  getFaultStatisticsList() {
    const condition = {
      companyId: this.selectedCompany,
      startTime: DateTimeUtil.formatDateTimeToString(this.startTimeValue),
      endTime: DateTimeUtil.formatDateTimeToString(this.endTimeValue),
      statisticsType: +this.selectedType
    };
    this.tableLoading = true;
    this.statisticsService.getFaultStatisticsList(condition).subscribe(
      (res: HttpResponseData<FaultStatistics[]>) => {
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
    if (!this.authService.isAdmin()) { return; }
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
    this.getFaultStatisticsList();
  }

}
