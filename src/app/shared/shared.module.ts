import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateTimeUtil } from './date-time-util';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DateTimeUtil
  ],
  declarations: []
})
export class SharedModule { }
