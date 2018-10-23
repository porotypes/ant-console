import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
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
    this.loginService.login(this.validateForm.value).subscribe(result => {
      if (result.status === 200) {
        this.storageService.writeStorage('USER_TOKEN', result.obj);
        this.authService.user = this.authService.decodeToken();
      }
    });
  }

}
