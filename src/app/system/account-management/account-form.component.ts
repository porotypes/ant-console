import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { RoleService } from '../../core/system/role.service';
import { CompanyService } from '../../core/system/company.service';
import { AccountService } from '../../core/system/account.service';
import { LanguageService } from '../../core/language.service';
import { AuthService } from '../../core/auth/auth.service';
import { LoginService } from '../../core/auth/login.service';

import { HttpResponseData } from 'src/app/common/http-response-data';
import { Pagination } from '../../common/pagination';
import { Company } from '../../common/company';
import { Role } from '../../common/role';
import { Account } from '../../common/account';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  accountForm: FormGroup;
  pagination = new Pagination<Company>();
  rolePagination = new Pagination<Role>();
  currentAccountId: number;
  companies: Company[];
  roles: Role[];
  isSaving = false;
  isAdd = true;

  constructor(
    private fb: FormBuilder,
    private messageService: NzMessageService,
    private companyService: CompanyService,
    private roleService: RoleService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
    private loginService: LoginService,
    private languageService: LanguageService,
  ) { }

  private createForm() {
    this.accountForm = this.fb.group({
      username: [null, [Validators.required]],
      nickname: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      companyId: [this.authService.decodeToken().companyId, [Validators.required]],
      roles: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.createForm();
    this.getAllCompanies();
    this.getAllRole();
    this.getCurrentId();
  }

  getCurrentId() {
    this.currentAccountId = this.route.params['value'].id;
    if (this.currentAccountId) {
      this.getAccount();
      this.isAdd = false;
    }
  }

  getAccount() {
    this.accountService.getAccount(this.currentAccountId).subscribe(
      (res: HttpResponseData<Account>) => {
        if (res.status === 200) {
          this.populateForm(res.obj);
        } else {
          this.messageService.success(res.msg);
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

  getAllRole() {
    this.rolePagination.size = 9999999;
    this.roleService.getRoleList(this.rolePagination).subscribe(
      (res: HttpResponseData<Pagination<Role>>) => {
        if (res.status === 200) {
          this.roles = res.obj.records;
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

  populateForm(account: Account) {
    const ids = [];
    account.roles.forEach(role => {
      ids.push(role.id);
    });
    this.accountForm.patchValue({
      username: account.username,
      nickname: account.nickname,
      phoneNumber: account.phoneNumber,
      address: account.address,
      email: account.email,
      password: account.password,
      companyId: account.companyId,
      roles: ids
    });
  }

  submitForm() {
    if (this.currentAccountId) {
      this.updateAccount();
    } else {
      this.addAccount();
    }
  }

  addAccount() {
    if (this.accountForm.valid) {
      this.isSaving = true;
      this.accountService.addAccount(this.accountForm.value).subscribe(
        (res: HttpResponseData<Account>) => {
          this.isSaving = false;
          if (res.status === 200) {
            this.messageService.success(res.msg);
            this.router.navigate(['/dashboard/account-management']);
          } else {
            this.messageService.error(res.msg);
          }
        },
        error => {
          this.isSaving = false;
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
    } else {
      for (const i in this.accountForm.controls) {
        if (this.accountForm.controls.hasOwnProperty(i)) {
          this.accountForm.controls[i].markAsDirty();
          this.accountForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }

  updateAccount() {
    if (this.accountForm.valid) {
      this.isSaving = true;
      this.accountService.updateAccount(this.currentAccountId, this.accountForm.value).subscribe(
        (res: HttpResponseData<Account>) => {
          this.isSaving = false;
          if (res.status === 200) {
            this.messageService.success(res.msg);
            this.router.navigate(['/dashboard/account-management']);
          } else {
            this.messageService.error(res.msg);
          }
        },
        error => {
          this.isSaving = false;
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
    } else {
      for (const i in this.accountForm.controls) {
        if (this.accountForm.controls.hasOwnProperty(i)) {
          this.accountForm.controls[i].markAsDirty();
          this.accountForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }

}
