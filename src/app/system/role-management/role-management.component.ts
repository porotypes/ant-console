import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { RoleService } from '../../core/system/role.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

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
  tableLoading = false;

  constructor(
    public authService: AuthService,
    private roleService: RoleService,
    private messageService: NzMessageService,
    private router: Router
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
        this.messageService.error(error.error.msg);
      }
    );
  }

  editRole(role: Role) {
    this.router.navigate([`/edit-role/${role.id}`]);
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
        this.messageService.error(error.error.msg);
      }
    );
  }

}
