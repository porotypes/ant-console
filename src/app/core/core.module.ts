import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// auth
import { LoginService } from './auth/login.service';
import { AuthService } from './auth/auth.service';
import { StorageService } from './storage.service';

// service
import { PermissionService } from './system/permission.service';
import { AccountService } from './system/account.service';
import { CompanyService } from './system/company.service';
import { RoleService } from './system/role.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LoginService,
    AuthService,
    StorageService,

    PermissionService,
    AccountService,
    CompanyService,
    RoleService
  ],
  declarations: []
})
export class CoreModule { }
