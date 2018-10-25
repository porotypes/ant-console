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
  timer: any;

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
    private chatInformationService: ChatInformationService
  ) {}

  createForm() {
    this.changePswForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.createForm();
    this.getUnreadChatInformationNum();
    this.sub = this.chatInformationService.getList.subscribe((total: number) => {
      this.getUnreadChatInformationNum();
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
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.messageService.error(error.error.msg || '响应超时！');
      }
    );
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
          this.messageService.success('账号信息变更，请重新登录!');
          this.storageService.removeStorage('USER_TOKEN');
          this.router.navigate(['/login']);
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.isSaving = false;
        this.messageService.error(error.error.msg);
      }
    );
  }

  loginOut() {
    this.loginService.loginOut();
  }
}
