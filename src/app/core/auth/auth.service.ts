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

  private getPermissionsForUser(): Array<string> {
    return JSON.parse(this.decodeToken().permissions);
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

  /**
   * reset psssword
   */
  public isCanResetPassword(): boolean {
    return this.getPermissionsForUser().some(item => item === 'RESET_PASSWORD');
  }

  /**
   * show company list
   */
  public isCanShowCompanyList(): boolean {
    return this.getPermissionsForUser().some(item => item === 'COMPANY_LIST');
  }

  /**
   * show company vague list
   */
  public isCanShowCompanyVagueList(): boolean {
    return this.getPermissionsForUser().some(item => item === 'COMPANY_VAGUE_LIST');
  }

  /**
   * add company
   */
  public isCanAddCompany(): boolean {
    return this.getPermissionsForUser().some(item => item === 'COMPANY_ADD');
  }

  /**
   * update company
   */
  public isCanUpdateCompany(): boolean {
    return this.getPermissionsForUser().some(item => item === 'COMPANY_UPDATE');
  }

  /**
   * delete company
   */
  public isCanDeleteCompany(): boolean {
    return this.getPermissionsForUser().some(item => item === 'COMPANY_DELETE');
  }

  /**
   * show role list
   */
  public isCanShowRoleList(): boolean {
    return this.getPermissionsForUser().some(item => item === 'ROLE_LIST');
  }

  /**
   * get company
   */
  public isCanGetCompany(): boolean {
    return this.getPermissionsForUser().some(item => item === 'COMPANY_GET');
  }

  /**
   * get role detail
   */
  public isCanGetRole(): boolean {
    return this.getPermissionsForUser().some(item => item === 'ROLE_GET');
  }

  /**
   * add role
   */
  public isCanAddRole(): boolean {
    return this.getPermissionsForUser().some(item => item === 'ROLE_ADD');
  }

  /**
   * update role
   */
  public isCanUpdateRole(): boolean {
    return this.getPermissionsForUser().some(item => item === 'ROLE_UPDATE');
  }

  /**
   * delete role
   */
  public isCanDeleteRole(): boolean {
    return this.getPermissionsForUser().some(item => item === 'ROLE_DELETE');
  }

  /**
   * show user list
   */
  public isCanShowUserList(): boolean {
    return this.getPermissionsForUser().some(item => item === 'USER_LIST');
  }

  /**
   * get user
   */
  public isCanGetUser(): boolean {
    return this.getPermissionsForUser().some(item => item === 'USER_GET');
  }

  /**
   * add user
   */
  public isCanAddUser(): boolean {
    return this.getPermissionsForUser().some(item => item === 'USER_ADD');
  }

  /**
   * update user
   */
  public isCanUpdateUser(): boolean {
    return this.getPermissionsForUser().some(item => item === 'USER_UPDATE');
  }

  /**
   * delete user
   */
  public isCanDeleteUser(): boolean {
    return this.getPermissionsForUser().some(item => item === 'USER_DELETE');
  }

  /**
   * show chat receive list
   */
  public isCanShowChatReceiveList(): boolean {
    return this.getPermissionsForUser().some(item => item === 'CHAT_RECEIVE_LIST');
  }

  /**
   * show chat send list
   */
  public isCanShowChatSendList(): boolean {
    return this.getPermissionsForUser().some(item => item === 'CHAT_SEND_LIST');
  }

  /**
   * get chat
   */
  public isCanGetChat(): boolean {
    return this.getPermissionsForUser().some(item => item === 'CHAT_GET');
  }

  /**
   * add chat
   */
  public isCanAddChat(): boolean {
    return this.getPermissionsForUser().some(item => item === 'CHAT_ADD');
  }

  /**
   * add equipment
   */
  public isCanAddEquipment(): boolean {
    return this.getPermissionsForUser().some(item => item === 'ADD_EQUIPMENT');
  }

  /**
   * delete equipment
   */
  public isCanDeleteEquipment(): boolean {
    return this.getPermissionsForUser().some(item => item === 'DELETE_EQUIPMENT');
  }

  /**
   * update equipment
   */
  public isCanUpdateEquipment(): boolean {
    return this.getPermissionsForUser().some(item => item === 'UPDATE_EQUIPMENT');
  }

  /**
   * show equipment list
   */
  public isCanShowEquipmentList(): boolean {
    return this.getPermissionsForUser().some(item => item === 'LIST_EQUIPMENT');
  }

  /**
   * upload equipment
   */
  public isCanUploadEquipment(): boolean {
    return this.getPermissionsForUser().some(item => item === 'UPLOAD_EQUIPMENTS');
  }

  /**
   * download equipment template
   */
  public isCanDownEquipmentTemplate(): boolean {
    return this.getPermissionsForUser().some(item => item === 'DOWNLOAD_EQUIPMENTS_TEMPLATE');
  }

  /**
   * get huobi
   */
  public isCanGetHuoBi(): boolean {
    return this.getPermissionsForUser().some(item => item === 'HUOBI_GET');
  }

  /**
   * transaction statistics
   */
  public isCanTansactionStatistice(): boolean {
    return this.getPermissionsForUser().some(item => item === 'TRANSACTION_STATISTICS');
  }

  /**
   * get permission list
   */
  public isCanGetPermissionList(): boolean {
    return this.getPermissionsForUser().some(item => item === 'PERMISSION_LIST');
  }

}
