import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpResponseData } from 'src/app/common/http-response-data';

import { StorageService } from '../storage.service';

@Injectable()
export class LoginService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public login(user) {
    return this.http.post<HttpResponseData<string>>(environment.base_url + 'login', user);
  }

  loginOut() {
    this.storageService.removeStorage('USER_TOKEN');
    this.router.navigate(['/login']);
  }
}
