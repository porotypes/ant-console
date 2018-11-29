import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

import { EquipmentService } from '../../core/equipment/equipment.service';
import { CompanyService } from '../../core/system/company.service';
import { LanguageService } from '../../core/language.service';

import { HttpResponseData } from 'src/app/common/http-response-data';
import { Pagination } from 'src/app/common/pagination';
import { Equipment } from 'src/app/common/equipment';
import { Company } from 'src/app/common/company';
import { LoginService } from 'src/app/core/auth/login.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {

  equipmentForm: FormGroup;
  isSaving = false;
  currentEquipmentId: number;
  companies: Company[];
  pagination = new Pagination<Company>();
  selectedCompany: number;

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
    private companyService: CompanyService,
    private messageService: NzMessageService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private languageService: LanguageService
  ) { }

  createForm() {
    this.equipmentForm = this.fb.group({
      equipmentId: [null, [Validators.required]],
      owner: [this.authService.decodeToken().companyId, [Validators.required]],
      address1: [null],
      amountOfCash: [0, [Validators.required]],
      equipmentName: [null, [Validators.required]],
      highThreshold: [null],
      lowThreshold: [null],
      maximumCashAmount: [0],
      serialNumber: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.createForm();
    this.getAllCompanies();
    this.getCurrentEquipmentId();
    this.selectedCompany = this.authService.decodeToken().companyId;
    // this.selectedCompany = this.authService.decodeToken().companyId;
  }

  getAllCompanies() {
    if (!this.authService.isAdmin()) {
      return;
    }
    this.pagination.size = 9999999;
    this.companyService.getCompanyList(this.pagination).subscribe(
      (res: HttpResponseData<Pagination<Company>>) => {
        if (res.status === 200) {
          this.companies = res.obj.records;
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        if (error.error.status === 401) {
          this.loginService.loginOut();
        }
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

  getEquipment() {
    this.equipmentService.getEquipment(this.currentEquipmentId).subscribe(
      (res: HttpResponseData<Equipment>) => {
        if (res.status === 200) {
          this.populateForm(res.obj);
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        if (error.error.status === 401) {
          this.loginService.loginOut();
        }
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

  populateForm(equipment: Equipment) {
    this.equipmentForm.patchValue({
      equipmentId: equipment.equipmentId,
      owner: equipment.owner,
      address: equipment.address,
      amountOfCash: equipment.amountOfCash,
      equipmentName: equipment.equipmentName,
      highThreshold: equipment.highThreshold,
      lowThreshold: equipment.lowThreshold,
      maximumCashAmount: equipment.maximumCashAmount,
      serialNumber: equipment.serialNumber
    });
  }

  submitForm() {
    if (!this.equipmentForm.valid) {
      for (const i in this.equipmentForm.controls) {
        if (this.equipmentForm.controls.hasOwnProperty(i)) {
          this.equipmentForm.controls[i].markAsDirty();
          this.equipmentForm.controls[i].updateValueAndValidity();
        }
      }
      return;
    }
    if (!this.currentEquipmentId) {
      this.addEquipment();
    } else {
      this.updateEquipment();
    }
  }

  addEquipment() {
    this.equipmentService.addEquipment(this.equipmentForm.value).subscribe(
      (res: HttpResponseData<Pagination<Equipment>>) => {
        if (res.status === 200) {
          this.messageService.success(res.msg);
          this.router.navigate(['/dashboard/equipment-list']);
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        if (error.error.status === 401) {
          this.loginService.loginOut();
        }
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

  updateEquipment() {
    this.equipmentForm.value['id'] = this.currentEquipmentId;
    this.equipmentService.updateEquipment(this.equipmentForm.value).subscribe(
      (res: HttpResponseData<Pagination<Equipment>>) => {
        if (res.status === 200) {
          this.messageService.success(res.msg);
          this.router.navigate(['/dashboard/equipment-list']);
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        if (error.error.status === 401) {
          this.loginService.loginOut();
        }
        if (this.languageService.currentLang === 'zh_CN') {
          this.messageService.error(error.error.msg || '响应超时！');
        } else {
          this.messageService.error(error.error.msg || 'Server response timeout!');
        }
      }
    );
  }

  getCurrentEquipmentId() {
    this.currentEquipmentId = this.route.params['value'].id;
    if (this.currentEquipmentId) {
      this.getEquipment();
    }
  }

}
