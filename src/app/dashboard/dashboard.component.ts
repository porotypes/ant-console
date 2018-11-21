import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { AuthService } from '../core/auth/auth.service';
import { StorageService } from '../core/storage.service';
import { LoginService } from '../core/auth/login.service';
import { ChatInformationService } from '../core/system/chat-information.service';
import { LanguageService } from '../core/language.service';

import { HttpResponseData } from '../common/http-response-data';
import { Pagination } from '../common/pagination';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterContentInit, OnDestroy {

  isShowChangePswDialog = false;
  changePswForm: FormGroup;
  isSaving = false;
  unreadInformationNum = 0;
  sub: any;
  langSub: any;
  timer: any;
  selectedLanguage = 'zh_CN';

  get loginStatus(): boolean {
    return this.storageService.hasStorage('USER_TOKEN')
      && !this.authService.isExpired();
  }

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private storageService: StorageService,
    private loginService: LoginService,
    private messageService: NzMessageService,
    private router: Router,
    private chatInformationService: ChatInformationService,
    private languageService: LanguageService
  ) { }

  createForm() {
    this.changePswForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.createForm();
    if (this.authService.isCanShowChatReceiveList()) {
      this.getUnreadChatInformationNum();
    }
    this.selectedLanguage = this.storageService.readStorage('language') || 'zh_CN';
    this.sub = this.chatInformationService.getList.subscribe((total: number) => {
      this.getUnreadChatInformationNum();
    });
    this.langSub = this.languageService.lang.subscribe((lang: string) => {
      this.languageService.currentLang = lang;
    });
  }

  ngAfterContentInit() {
    if (this.storageService.hasStorage('USER_TOKEN')) {
      this.authService.user = this.authService.decodeToken();
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.langSub.unsubscribe();
    clearInterval(this.timer);
  }

  getUnreadChatInformationNum() {
    clearInterval(this.timer);
    this.chatInformationService.getUnreadChatInformation(new Pagination()).subscribe(
      (res: HttpResponseData<Pagination<any>>) => {
        if (res.status === 200) {
          this.unreadInformationNum = res.obj.total;
          this.timer = setInterval(() => {
            this.getUnreadChatInformationNum();
          }, 60000);
        } else if (res.status === 401) {
          this.loginService.loginOut();
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

  selectLanguage(lang: string) {
    this.storageService.writeStorage('language', lang);
    this.languageService.langEvent.emit();
  }

  openDialog() {
    this.isShowChangePswDialog = true;
  }

  closeDialog() {
    this.isShowChangePswDialog = false;
    this.changePswForm.reset();
  }

  changePassword() {
    this.isSaving = true;
    this.authService.changePassword(this.changePswForm.value).subscribe(
      (res: HttpResponseData<any>) => {
        this.isSaving = false;
        if (res.status === 200) {
          this.isShowChangePswDialog = false;
          if (this.languageService.currentLang === 'zh_CN') {
            this.messageService.success('账号信息变更，请重新登录!');
          } else {
            this.messageService.success('Change of account information, please login again!');
          }
          this.storageService.removeStorage('USER_TOKEN');
          this.router.navigate(['/login']);
        } else if (res.status === 401) {
          this.loginService.loginOut();
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.isSaving = false;
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

  loginOut() {
    this.loginService.loginOut();
  }
}
