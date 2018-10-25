import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { PermissionService } from '../../core/system/permission.service';
import { RoleService } from '../../core/system/role.service';

import { HttpResponseData } from 'src/app/common/http-response-data';
import { Permission } from '../../common/Permission';
import { Role } from '../../common/role';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {

  roleForm: FormGroup;
  permissions: Permission[];
  currentRoleId: number;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private permissionService: PermissionService,
    private messageService: NzMessageService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  private createForm() {
    this.roleForm = this.fb.group({
      roleName: [null, [Validators.required]],
      permissions: [[]],
    });
  }

  ngOnInit() {
    this.createForm();
    this.getAllPermission();
  }

  getCurrentRoleId() {
    this.currentRoleId = this.route.params['value'].id;
    if (this.currentRoleId) {
      this.getRole();
    }
  }

  getAllPermission() {
    this.permissionService.getAllPermissions().subscribe(
      (res: HttpResponseData<Permission[]>) => {
        if (res.status === 200) {
          this.permissions = res.obj;
          this.permissions.map(role => { role['checked'] = false; });
          this.getCurrentRoleId();
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.messageService.error(error.error.msg || '响应超时！');
      }
    );
  }

  getRole() {
    this.roleService.getRole(this.currentRoleId).subscribe(
      (res: HttpResponseData<Role>) => {
        if (res.status === 200) {
          this.populateForm(res.obj);
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.messageService.error(error.error.msg || '响应超时！');
      }
    );
  }

  populateForm(role: Role) {
    this.roleForm.patchValue({
      roleName: role.roleName
    });
    this.permissions.forEach(permission => {
      if (role.permissions.some(item => permission.id === item['id'])) {
        permission['checked'] = true;
      }
    });
  }

  selectPermissions(ids: number[]) {
    this.roleForm.value.permissions = ids;
  }

  submitForm() {
    if (this.currentRoleId > 0) {
      this.updateRole();
    } else {
      this.addRole();
    }
  }

  addRole() {
    if (this.roleForm.valid) {
      this.isSaving = true;
      this.roleService.addRole(this.roleForm.value).subscribe(
        (res: HttpResponseData<Role>) => {
          this.isSaving = false;
          if (res.status === 200) {
            this.messageService.success(res.msg);
            this.router.navigate(['/role-management']);
          } else {
            this.messageService.error(res.msg);
          }
        },
        error => {
          this.isSaving = false;
          this.messageService.error(error.error.msg || '响应超时！');
        }
      );
    }
  }

  updateRole() {
    if (this.roleForm.valid) {
      this.isSaving = true;
      this.roleService.updateRole(this.currentRoleId, this.roleForm.value).subscribe(
        (res: HttpResponseData<Role>) => {
          this.isSaving = false;
          if (res.status === 200) {
            this.messageService.success(res.msg);
            this.router.navigate(['/role-management']);
          } else {
            this.messageService.error(res.msg);
          }
        },
        error => {
          this.isSaving = false;
          this.messageService.error(error.error.msg || '响应超时！');
        }
      );
    }
  }

}
