import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LanguageService {

  public langEvent: EventEmitter<any> = new EventEmitter();
  public lang: EventEmitter<string> = new EventEmitter();
  public currentLang = 'zh_CN';

}
