import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Pagination } from '../../common/pagination';
import { Account } from '../../common/account';
import { HttpResponseData } from 'src/app/common/http-response-data';

@Injectable()
export class AccountService extends HttpService<HttpResponseData<Pagination<Account>>> {

  private URL = 'user';

  getAccountList(pagination: Pagination<Account>) {
    const url = `${this.URL}/${pagination.current}/${pagination.size}`;
    return super.getPagination(url);
  }

  searchAccount(pagination: Pagination<Account>, accountName: string) {
    const url = `${this.URL}/${accountName}/${pagination.current}/${pagination.size}`;
    return super.getPagination(url);
  }

  getAccount(id: number) {
    const url = `${this.URL}/${id}`;
    return super.get(url);
  }

  addAccount(account: Account) {
    return super.post(this.URL, account);
  }

  updateAccount(id: number, account: Account) {
    const url = `${this.URL}/${id}`;
    return super.update(url, account);
  }

  deletedAccount(account: Account) {
    return super.deleted(this.URL, account);
  }

}
