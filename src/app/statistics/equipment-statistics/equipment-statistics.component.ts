import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { StatisticsService } from '../../core/statistics/statistics.service';
import { DateTimeUtil } from '../../shared/date-time-util';
import { CompanyService } from '../../core/system/company.service';
import { AuthService } from '../../core/auth/auth.service';
import { LanguageService } from '../../core/language.service';
import { EquipmentService } from '../../core/equipment/equipment.service';
import { LoginService } from '../../core/auth/login.service';

import { EquipmentStatistics } from '../../common/Equipment-statistics';
import { HttpResponseData } from 'src/app/common/http-response-data';
import { Pagination } from 'src/app/common/pagination';
import { Company } from 'src/app/common/company';
import { Equipment } from 'src/app/common/equipment';

@Component({
  selector: 'app-equipment-statistics',
  templateUrl: './equipment-statistics.component.html',
  styleUrls: ['./equipment-statistics.component.css']
})
export class EquipmentStatisticsComponent implements OnInit {

  startTimeValue = DateTimeUtil.getStartTimeString(new Date());
  endTimeValue = DateTimeUtil.getEndTimeString(new Date());
  selectedCompany = '';
  statisticsList: EquipmentStatistics[];
  tableLoading = false;
  pagination = new Pagination<Company>();
  paginationE = new Pagination<Equipment>();
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
    private equipmentService: EquipmentService,
    private languageService: LanguageService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    if (this.authService.isAdmin()) {
      this.getAllCompanies();
    }
    this.getEquipmentList();
  }

    // 获取设备列表
    getEquipmentList() {
      const query = {
        status: ''
      };
      this.tableLoading = true;
      this.equipmentService.getEquipmetList(this.paginationE, query).subscribe(
        (res: Pagination<Equipment>) => {
          this.tableLoading = false;
          this.paginationE = res;
        },
        error => {
          this.tableLoading = false;
          this.messageService.error(error.error.msg);
        }
      );
    }

  getEquipmentStatisticsList() {
    const condition = {
      companyId: this.selectedCompany,
      startTime: DateTimeUtil.formatDateTimeToString(this.startTimeValue),
      endTime: DateTimeUtil.formatDateTimeToString(this.endTimeValue),
      statisticsType: 1
    };
    this.tableLoading = true;
    this.statisticsService.getEquipmentStatisticsList(condition).subscribe(
      (res: HttpResponseData<EquipmentStatistics[]>) => {
        this.tableLoading = false;
        if (res.status === 200) {
          res.obj.forEach((e, k) => {
            res.obj[k].equipmentName = '';
            this.paginationE.records.forEach(i => {
              if (i.equipmentId !== '') {
                if (i.equipmentId === e.equipmentId) {
                  res.obj[k].equipmentName = i.equipmentName;
                }
              }
            }
            );
          });
          this.statisticsList = res.obj;
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.tableLoading = false;
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

  search() {
    this.getEquipmentStatisticsList();
  }

}
