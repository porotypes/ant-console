import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DateTimeUtil } from './date-time-util';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DateTimeUtil
  ],
  declarations: [],
  exports: [
    // TranslateHttpLoader,
    TranslateModule
  ]
})
export class SharedModule { }
