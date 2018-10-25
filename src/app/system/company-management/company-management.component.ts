import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { CompanyService } from '../../core/system/company.service';
import { NzMessageService } from 'ng-zorro-antd';

import { Company } from '../../common/company';
import { Pagination } from '../../common/pagination';
import { HttpResponseData } from '../../common/http-response-data';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent implements OnInit {

  pagination = new Pagination<Company>();
  tableLoading = true;
  companyName: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private companyService: CompanyService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getCompanyList();
  }

  getCompanyList() {
    this.companyService.getCompanyList(this.pagination).subscribe(
      (res: HttpResponseData<Pagination<Company>>) => {
        this.tableLoading = false;
        if (res.status === 200) {
          this.pagination = res.obj;
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.messageService.error(error.error.msg || '响应超时！');
      }
    );
  }

  changePageOrSize(resetPageIndex = false) {
    if (resetPageIndex) {
      this.pagination.pages = 1;
    }
    this.tableLoading = true;
    this.getCompanyList();
  }

  searchCompany() {
    if (this.companyName.trim() === '') {
      this.getCompanyList();
      return;
    }
    this.pagination.pages = 1;
    this.pagination.size = 10;
    this.companyService.searchCompany(this.pagination, this.companyName).subscribe(
      (res: HttpResponseData<Pagination<Company>>) => {
        if (res.status === 200) {
          this.pagination = res.obj;
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.messageService.error(error.error.msg || '响应超时！');
      }
    );
  }

  editCompany(company: Company) {
    this.router.navigate([`edit-company/${company.id}`]);
  }

  deleteCompany(company: Company) {
    this.companyService.deleteCompany(company).subscribe(
      (res: HttpResponseData<Company>) => {
        if (res.status === 200) {
          this.messageService.success(res.msg);
          this.getCompanyList();
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.messageService.error(error.error.msg || '响应超时！');
      }
    );
  }

}
