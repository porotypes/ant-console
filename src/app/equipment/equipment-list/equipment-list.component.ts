import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadXHRArgs  } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { EquipmentService } from '../../core/equipment/equipment.service';
import { AuthService } from '../../core/auth/auth.service';
import { LanguageService } from '../../core/language.service';

import { Pagination } from 'src/app/common/pagination';
import { Equipment } from 'src/app/common/equipment';
import { HttpResponseData } from 'src/app/common/http-response-data';
import { LoginService } from 'src/app/core/auth/login.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  private panelStyle = {
    'background': '#f7f7f7',
    'border-radius': '4px',
    'margin-bottom': '24px',
    'border': 'none'
  };
  pagination = new Pagination<Equipment>();
  tableLoading = false;
  selectedStatus = '';

  constructor(
    private equipmentService: EquipmentService,
    private messageService: NzMessageService,
    private router: Router,
    public authService: AuthService,
    private loginService: LoginService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.getEquipmentList();
  }

  getEquipmentList() {
    const query = {
      status: this.selectedStatus
    };
    this.tableLoading = true;
    this.equipmentService.getEquipmetList(this.pagination, query).subscribe(
      (res: Pagination<Equipment>) => {
        this.tableLoading = false;
        this.pagination = res;
      },
      error => {
        this.tableLoading = false;
        this.messageService.error(error.error.msg);
      }
    );
  }

  changePageOrSize(event, resetPageIndex = false) {
    if (event === 0) {
      return;
    }
    if (resetPageIndex) {
      this.pagination.current = event;
    }
    this.getEquipmentList();
  }

  changeStatus(status) {
    if (status === 'all') {
      this.getEquipmentList();
    } else {
      this.getEquipmentList();
    }
  }

  downloadExcel() {
    this.equipmentService.downloadExcel().subscribe(
      (res: Blob) => {
        console.log(res);
        const file = new Blob([res], {type: 'application/vnd.ms-excel'});
        const url = URL.createObjectURL(file);
        window.open(url);
      }
    );
  }

  uploadExcel = (item: UploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.equipmentService.uploadExcel(formData).subscribe(
      (res: HttpResponseData<any>) => {
        if (res.status === 200) {
          this.messageService.success(res.msg);
        } else if ( res.status === 401) {
          this.loginService.loginOut();
        }  else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.messageService.error(error.error.msg);
      }
    );
  }

  addEquipment() {
    this.router.navigate(['/dashboard/add-equipment']);
  }

  editEquipment(equipment: Equipment) {
    this.router.navigate([`/dashboard/edit-equipment/${equipment.id}`]);
  }

  deleteEquipment(equipment: Equipment) {
    this.equipmentService.deleteEquipment(equipment).subscribe(
      (res: HttpResponseData<Equipment>) => {
        if (res.status === 200) {
          this.messageService.success(res.msg);
          this.getEquipmentList();
        } else if ( res.status === 401) {
          this.loginService.loginOut();
        }  else {
          this.messageService.error(res.msg);
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

}
