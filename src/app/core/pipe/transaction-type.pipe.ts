import { Pipe, PipeTransform } from '@angular/core';
import { StorageService } from '../storage.service';

@Pipe({
  name: 'transactionType'
})
export class TransactionTypePipe implements PipeTransform {

  constructor(
    private storageService: StorageService
  ) {}

  transform(value: any, args?: any): string {
    const lang = this.storageService.readStorage('language');
    switch (+value) {
      case 1:
        if (lang === 'zh_CN') {
          return '买入';
        } else {
          return 'buy';
        }
        break;
      case 2:
        if (lang === 'zh_CN') {
          return '卖出';
        } else {
          return 'sell';
        }
        break;
    }
  }

}
