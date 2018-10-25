import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// login
import { LoginComponent } from './login/login.component';

// dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
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
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // login
  { path: 'login', component: LoginComponent },
  // dashboard
  { path: 'dashboard',
    component: DashboardComponent,
    children: [
      // home
      { path: 'home', component: HomeComponent },
      // account
      { path: 'account-management', component: AccountManagementComponent },
      { path: 'add-account', component: AccountFormComponent },
      { path: 'edit-account/:id', component: AccountFormComponent },
      // company
      { path: 'company-management', component: CompanyManagementComponent },
      { path: 'add-company', component: CompanyFormComponent },
      { path: 'edit-company/:id', component: CompanyFormComponent },
      // role
      { path: 'role-management', component: RoleManagementComponent },
      { path: 'add-role', component: RoleFormComponent },
      { path: 'edit-role/:id', component: RoleFormComponent },
      // customer-service
      { path: 'customer-service', component: CustomerServiceComponent }
    ]
  }
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
