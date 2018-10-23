import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Role } from '../../common/role';
import { Pagination } from 'src/app/common/pagination';

@Injectable()
export class RoleService extends HttpService<Role> {

  private URL = 'role';

  getRoleList(pagination: Pagination<Role>) {
    const url = `${this.URL}/${pagination.pages}/${pagination.size}`;
    return super.getPagination(url);
  }

  getRole(id: number) {
    const url = `${this.URL}/${id}`;
    return super.get(url);
  }

  addRole(data: Role) {
    return super.post(this.URL, data);
  }

  updateRole(id: number, data: Role) {
    const url = `${this.URL}/${id}`;
    return super.update(url, data);
  }

  deleteRole(data: Role) {
    return super.deleted(this.URL, data);
  }

}
