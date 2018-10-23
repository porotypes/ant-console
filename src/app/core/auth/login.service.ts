import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/common/login';

import { StorageService } from '../storage.service';

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public login(user) {
    return this.http.post<Login>(environment.base_url + 'login', user);
  }

  loginOut() {
    this.storageService.removeStorage('USER_TOKEN');
  }
}
