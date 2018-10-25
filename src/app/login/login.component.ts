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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: NzMessageService,
    private loginService: LoginService,
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

  submitForm(): void {
    if (!this.validateForm.valid) {
      return;
    }
    this.loginService.login(this.validateForm.value).subscribe(
      result => {
        if (result.status === 200) {
          this.messageService.success(result.msg);
          this.router.navigate(['/dashboard/home']);
          this.storageService.writeStorage('USER_TOKEN', result.obj);
          this.authService.user = this.authService.decodeToken();
        } else {
          this.messageService.error(result.msg);
        }
      },
      error => {
        this.messageService.error(error.error.msg || '响应超时！');
      }
    );
  }

}
