import { Component, OnInit, AfterContentInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from './core/auth/auth.service';
import { StorageService } from './core/storage.service';
import { LoginService } from './core/auth/login.service';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpResponseData } from './common/http-response-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {

  isShowChangePswDialog = false;
  changePswForm: FormGroup;
  isSaving = false;

  get loginStatus(): boolean {
    return this.storageService.hasStorage('USER_TOKEN')
      && !this.authService.isExpired();
  }

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private storageService: StorageService,
    private loginService: LoginService,
    private messageService: NzMessageService
  ) {}

  createForm() {
    this.changePswForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.createForm();
  }

  ngAfterContentInit() {
    if (this.storageService.hasStorage('USER_TOKEN')) {
      this.authService.user = this.authService.decodeToken();
    }
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
