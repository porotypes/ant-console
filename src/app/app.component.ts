import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService
  ) {
    translate.addLangs(['zh_CN', 'en-US']);
    translate.setDefaultLang('zh_CN');
    translate.use('zh_CN');
  }

  ngOnInit() {
    this.sub = this.languageService.langEvent.subscribe(() => {
      this.translate.use(this.storageService.readStorage('language'));
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
