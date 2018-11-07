import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../core/system/account.service';
import { AuthService } from '../../core/auth/auth.service';
import { LanguageService } from '../../core/language.service';
import { NzMessageService } from 'ng-zorro-antd';

import { Pagination } from '../../common/pagination';
import { Account } from '../../common/Account';
import { HttpResponseData } from '../../common/http-response-data';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {

  pagination = new Pagination<Account>();
  private tableLoading = true;

  constructor(
    private accountService: AccountService,
    private messageService: NzMessageService,
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.getAccountList();
  }

  private getAccountList() {
    this.accountService.getAccountList(this.pagination).subscribe(
      (res: HttpResponseData<Pagination<Account>>) => {
        this.tableLoading = false;
        if (res.status === 200) {
          this.pagination = res.obj;
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

  private changePageOrSize(event, resetPageIndex = false) {
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
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

}
