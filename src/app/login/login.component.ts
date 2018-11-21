import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { LoginService } from '../core/auth/login.service';
import { AuthService } from '../core/auth/auth.service';
import { StorageService } from '../core/storage.service';
import { LanguageService } from '../core/language.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // 解决sanitizing unsafe URL value问题

// import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  imgLoading = false;
  codeImg: SafeResourceUrl;
  key: string;
  // loginStatus = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: NzMessageService,
    private loginService: LoginService,
    private authService: AuthService,
    private languageService: LanguageService,
    private storageService: StorageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      key: [null, [Validators.required]]
    });
    this.refresh();

  }

  submitForm(): void {
    this.validateForm.value.key = this.key;
    // if (!this.validateForm.valid) {
    //   return;
    // }
    // this.validateForm.setValue({
    //   'password': Md5.hashStr(this.validateForm.value.password + new Date().getTime()),
    //   'time': new Date().getTime(),
    //   'username': this.validateForm.value.username
    // });
    this.loginService.login(this.validateForm.value).subscribe(
      result => {
        if (result.status === 200) {
          this.messageService.success(result.msg);
          this.router.navigate(['/dashboard']);
          this.storageService.writeStorage('USER_TOKEN', result.obj);
          this.authService.user = this.authService.decodeToken();
        } else {
          this.messageService.error(result.msg);
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

  // 刷新获取验证码
  refresh(): void {
    this.imgLoading = true;
    this.loginService.code().subscribe(
      resp => {
        this.codeImg = this.sanitizer.bypassSecurityTrustResourceUrl(resp.obj['img']);
        this.key = resp.obj['key'];
        this.imgLoading = false;
      },
      error => {
        this.imgLoading = false;
        this.messageService.error(error.error.msg);
      }
    );
  }

}
