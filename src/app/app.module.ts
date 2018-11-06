import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// component
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AccountManagementComponent } from './system/account-management/account-management.component';
import { AccountFormComponent } from './system/account-management/account-form.component';
import { CompanyManagementComponent } from './system/company-management/company-management.component';
import { RoleManagementComponent } from './system/role-management/role-management.component';
import { CompanyFormComponent } from './system/company-management/company-form.component';
import { CustomerServiceComponent } from './system/customer-service/customer-service.component';
import { RoleFormComponent } from './system/role-management/role-form.component';
import { EquipmentListComponent } from './equipment/equipment-list/equipment-list.component';
import { EquipmentMapComponent } from './equipment/equipment-map/equipment-map.component';
import { EquipmentCashComponent } from './equipment/equipment-cash/equipment-cash.component';
import { TradingRecordComponent } from './trading-record/trading-record.component';
import { EquipmentFormComponent } from './equipment/equipment-form/equipment-form.component';
import { EquipmentStatisticsComponent } from './statistics/equipment-statistics/equipment-statistics.component';
import { CompanyStatisticsComponent } from './statistics/company-statistics/company-statistics.component';
import { ExchangeComponent } from './exchange/exchange.component';

registerLocaleData(zh);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    AccountManagementComponent,
    AccountFormComponent,
    CompanyManagementComponent,
    RoleManagementComponent,
    CompanyFormComponent,
    CustomerServiceComponent,
    RoleFormComponent,
    EquipmentListComponent,
    EquipmentMapComponent,
    EquipmentCashComponent,
    TradingRecordComponent,
    EquipmentFormComponent,
    EquipmentStatisticsComponent,
    CompanyStatisticsComponent,
    ExchangeComponent
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
    NgZorroAntdModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
