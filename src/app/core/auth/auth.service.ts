import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpService } from '../http.service';

@Injectable()
export class AuthService extends HttpService<any> {

  private URL = 'password';
  public user: object;
  private helper = new JwtHelperService();

  private getToken(): string {
    return window.localStorage.getItem('USER_TOKEN');
  }

  /**
   * decodeToken
   */
  public decodeToken() {
    return this.helper.decodeToken(this.getToken());
  }

  /**
   * isExpired
   */
  public isExpired() {
    return this.helper.isTokenExpired(this.getToken());
  }

  /**
   * changePassword
   */
  public changePassword(data) {
    return super.update(this.URL, data);
  }

  /**
   * resetPassword
   */
  public resetPassword(id: number) {
    return super.patch(this.URL, id);
  }

}
