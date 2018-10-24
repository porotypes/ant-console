import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/core/auth/auth.guard';

// login
import { LoginComponent } from './login/login.component';
// home
import { HomeComponent } from './home/home.component';
// account
import { AccountManagementComponent } from './system/account-management/account-management.component';
import { AccountFormComponent } from './system/account-management/account-form.component';
// company
import { CompanyManagementComponent } from './system/company-management/company-management.component';
import { CompanyFormComponent } from './system/company-management/company-form.component';
// role
import { RoleManagementComponent } from './system/role-management/role-management.component';
import { RoleFormComponent } from './system/role-management/role-form.component';
// customer-service
import { CustomerServiceComponent } from './system/customer-service/customer-service.component';

const router: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // login
  { path: 'login', component: LoginComponent },
  // home
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // account
  { path: 'account-management', component: AccountManagementComponent, canActivate: [AuthGuard] },
  { path: 'add-account', component: AccountFormComponent, canActivate: [AuthGuard] },
  { path: 'edit-account/:id', component: AccountFormComponent, canActivate: [AuthGuard] },
  // company
  { path: 'company-management', component: CompanyManagementComponent, canActivate: [AuthGuard] },
  { path: 'add-company', component: CompanyFormComponent, canActivate: [AuthGuard] },
  { path: 'edit-company/:id', component: CompanyFormComponent, canActivate: [AuthGuard] },
  // role
  { path: 'role-management', component: RoleManagementComponent, canActivate: [AuthGuard] },
  { path: 'add-role', component: RoleFormComponent, canActivate: [AuthGuard] },
  { path: 'edit-role/:id', component: RoleFormComponent, canActivate: [AuthGuard] },
  // customer-service
  { path: 'customer-service', component: CustomerServiceComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(router)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
