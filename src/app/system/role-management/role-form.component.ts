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
import { LanguageService } from '../../core/language.service';
import { LoginService } from '../../core/auth/login.service';

import { HttpResponseData } from 'src/app/common/http-response-data';
import { Permission } from '../../common/Permission';
import { Role } from '../../common/role';
import { NzFormatEmitEvent } from 'ng-zorro-antd';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {

  roleForm: FormGroup;
  permissions: Permission[];
  permissionsList: Array<any>;
  permissionsChecked: Array<string>;
  currentRoleId: number;
  isSaving = false;
  treeLoading = false;

  constructor(
    private fb: FormBuilder,
    private permissionService: PermissionService,
    private messageService: NzMessageService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private languageService: LanguageService
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
    } else {
      this.treeLoading = false;
    }
  }

  // 获取所有权限
  getAllPermission() {
    this.treeLoading = true;
    this.permissionService.getAllPermissions().subscribe(
      (res: HttpResponseData<Permission[]>) => {
        if (res.status === 200) {
          const result = [];
          res.obj.forEach((e) => {
            // 给数组分类
            if (!result.some((item: any) => item.title === e.parentName)) {
              result.push({
                key: e.id,
                title: e.parentName,
                expanded: true,
                children: []
              });
            } else {
              const index = result.indexOf(result.find((item: any) => item.title === e.parentName));
              result[index].children.push({
                key: e.id,
                title: e.name,
                isLeaf: true
              });
            }
          });
          this.permissionsList = result;
          this.permissions = res.obj;
          this.permissions.map(role => { role['checked'] = false; });
          this.getCurrentRoleId();
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

  populateForm(role: Role) {
    // const ids = [];
    const checked = [];
    // this.permissions.forEach(permission => {
    //   if (role.permissions.some(item => permission.id === item['id'])) {
    //     permission['checked'] = true;
    //     ids.push(permission.id);
    //   }
    // });

    // 设置默认选中权限（当前角色已有权限）
    role.permissions.forEach(permission => {
      checked.push(permission['id']);
    });
    this.permissionsChecked = checked;
    this.treeLoading = false;

    this.roleForm.patchValue({
      roleName: role.roleName,
      permissions: checked
    });
  }

  // 更新选中的权限
  selectPermissions(event: NzFormatEmitEvent) {
    const keys = [];
    event.checkedKeys.forEach(key => {
      if (key.children.length > 0) {
        key.children.forEach(id => {
          keys.push(id.key);
        });
      } else {
        keys.push(key.key);
      }
    });
    this.roleForm.value.permissions = keys;
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
            this.router.navigate(['/dashboard/role-management']);
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
      for (const i in this.roleForm.controls) {
        if (this.roleForm.controls.hasOwnProperty(i)) {
          this.roleForm.controls[i].markAsDirty();
          this.roleForm.controls[i].updateValueAndValidity();
        }
      }
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
            this.router.navigate(['/dashboard/role-management']);
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
      for (const i in this.roleForm.controls) {
        if (this.roleForm.controls.hasOwnProperty(i)) {
          this.roleForm.controls[i].markAsDirty();
          this.roleForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }

}
