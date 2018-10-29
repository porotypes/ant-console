import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionType'
})
export class TransactionTypePipe implements PipeTransform {

  transform(value: any, args?: any): string {
    switch (+value) {
      case 1:
        return '买入';
        break;
      case 2:
        return '卖出';
        break;
    }
  }

}
