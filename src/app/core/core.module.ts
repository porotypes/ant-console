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
import { ChatInformationService } from './system/chat-information.service';
import { EquipmentService } from './equipment/equipment.service';
import { TradingRecordService } from './trading-record/trading-record.service';
import { StatisticsService } from './statistics/statistics.service';

// pipe
import { TransactionTypePipe } from './pipe/transaction-type.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    // service
    LoginService,
    AuthService,
    StorageService,

    PermissionService,
    AccountService,
    CompanyService,
    RoleService,
    ChatInformationService,

    EquipmentService,

    TradingRecordService,

    StatisticsService
  ],
  declarations: [
    TransactionTypePipe
  ],
  exports: [
    TransactionTypePipe
  ]
})
export class CoreModule { }
