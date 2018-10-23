import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Permission } from '../../common/Permission';

@Injectable()
export class PermissionService extends HttpService<Permission> {

  private URL = 'permission';

  getAllPermissions() {
    return super.getPagination(this.URL);
  }

}
