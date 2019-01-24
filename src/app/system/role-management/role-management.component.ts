import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { RoleService } from '../../core/system/role.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { LoginService } from '../../core/auth/login.service';

import { HttpResponseData } from '../../common/http-response-data';
import { Pagination } from '../../common/pagination';
import { Role } from '../../common/role';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {

  pagination = new Pagination<Role>();
  tableLoading = true;
  roleName: string;

  constructor(
    public authService: AuthService,
    private roleService: RoleService,
    private messageService: NzMessageService,
    private router: Router,
    private loginService: LoginService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.getRoleList();
  }

  getRoleList() {
    this.tableLoading = true;
    this.roleService.getRoleList(this.pagination).subscribe(
      (res: HttpResponseData<Pagination<Role>>) => {
        if (res.status === 200) {
          this.tableLoading = false;
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

  changePageOrSize(resetPageIndex = false) {
    this.tableLoading = true;
    this.getRoleList();
  }

  searchRole() {
    if (this.roleName.trim() === '') {
      this.getRoleList();
      return;
    }
    this.pagination.current = 1;
    this.pagination.size = 10;
    this.roleService.searchRole(this.pagination, this.roleName).subscribe(
      (res: HttpResponseData<Pagination<Role>>) => {
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

  editRole(role: Role) {
    this.router.navigate([`/dashboard/edit-role/${role.id}`]);
  }

  deleteRole(role: Role) {
    this.roleService.deleteRole(role).subscribe(
      (res: HttpResponseData<Role>) => {
        if (res.status === 200) {
          this.messageService.success(res.msg);
          this.getRoleList();
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
