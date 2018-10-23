import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

// component
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AccountManagementComponent } from './system/account-management/account-management.component';
import { AccountFormComponent } from './system/account-management/account-form.component';
import { CompanyManagementComponent } from './system/company-management/company-management.component';
import { RoleManagementComponent } from './system/role-management/role-management.component';
import { CompanyFormComponent } from './system/company-management/company-form.component';
import { CustomerServiceComponent } from './system/customer-service/customer-service.component';
import { RoleFormComponent } from './system/role-management/role-form.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AccountManagementComponent,
    AccountFormComponent,
    CompanyManagementComponent,
    RoleManagementComponent,
    CompanyFormComponent,
    CustomerServiceComponent,
    RoleFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
