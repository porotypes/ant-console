import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../core/system/account.service';
import { CompanyService } from '../../core/system/company.service';
import { AuthService } from '../../core/auth/auth.service';
import { LanguageService } from '../../core/language.service';
import { NzMessageService } from 'ng-zorro-antd';

import { Pagination } from '../../common/pagination';
import { Account } from '../../common/account';
import { HttpResponseData } from '../../common/http-response-data';
import { LoginService } from 'src/app/core/auth/login.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {

  pagination = new Pagination<Account>();
  tableLoading = true;
  accountName: string;
  pageSizeOptions = [ 5, 10, 20, 30, 40, 50 ];

  constructor(
    private accountService: AccountService,
    private companyService: CompanyService,
    private messageService: NzMessageService,
    public authService: AuthService,
    private loginService: LoginService,
    private router: Router,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.getAccountList();
  }

  private getAccountList() {
    this.tableLoading = true;
    this.accountService.getAccountList(this.pagination).subscribe(
      (res: HttpResponseData<Pagination<Account>>) => {

        if (res.status === 200) {
          // res.obj.records.forEach((e, k) => {
          //   res.obj.records[k].companyName = this.getCompanyName(e.companyId);
          // });
          this.pagination = res.obj;
          console.log(res.obj);
        } else {
          this.messageService.error(res.msg);
        }
        this.tableLoading = false;
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

  public changePageOrSize(event, resetPageIndex = false) {
    if (event === 0) {
      return;
    }
    if (resetPageIndex) {
      this.pagination.current = event;
    }
    this.tableLoading = true;
    this.getAccountList();
  }

  private resetPassword(account: Account) {
    this.authService.resetPassword(account.id).subscribe(
      (res: HttpResponseData<any>) => {
        if (res.status === 200) {
          this.messageService.success(res.msg);
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

  searchAccount() {
    if (this.accountName.trim() === '') {
      this.getAccountList();
      return;
    }
    this.pagination.current = 1;
    this.pagination.size = 10;
    this.accountService.searchAccount(this.pagination, this.accountName).subscribe(
      (res: HttpResponseData<Pagination<Account>>) => {
        if (res.status === 200) {
          this.pagination = res.obj;
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

  private editAccount(account: Account) {
    this.router.navigate([`/dashboard/edit-account/${account.id}`]);
  }

  private deleteAccount(account: Account) {
    this.accountService.deletedAccount(account).subscribe(
      (res: HttpResponseData<Account>) => {
        if (res.status === 200) {
          this.getAccountList();
          this.messageService.success(res.msg);
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

}
