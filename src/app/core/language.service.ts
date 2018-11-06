import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LanguageService {

  public langEvent: EventEmitter<any> = new EventEmitter();

}
