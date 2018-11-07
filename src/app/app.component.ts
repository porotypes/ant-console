import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';

import { AuthService } from './core/auth/auth.service';
import { StorageService } from './core/storage.service';
import { LanguageService } from './core/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  sub: any;

  constructor(
    public authService: AuthService,
    private storageService: StorageService,
    private languageService: LanguageService,
    private translate: TranslateService,
    private nzI18nService: NzI18nService
  ) {
    translate.addLangs(['zh_CN', 'en-US']);
    translate.setDefaultLang('zh_CN');
    translate.use('zh_CN');
  }

  ngOnInit() {
    this.setCurrentLang();
    this.subscribeCurrentLang();
  }

  setCurrentLang() {
    this.translate.use(this.storageService.readStorage('language'));
    if (this.storageService.readStorage('language') === 'en_US') {
      this.nzI18nService.setLocale(en_US);
    } else {
      this.nzI18nService.setLocale(zh_CN);
    }
  }

  subscribeCurrentLang() {
    this.sub = this.languageService.langEvent.subscribe(() => {
      const lang = this.storageService.readStorage('language');
      this.translate.use(lang);
      this.languageService.lang.emit(lang);
      if (lang === 'en_US') {
        this.nzI18nService.setLocale(en_US);
      } else {
        this.nzI18nService.setLocale(zh_CN);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
