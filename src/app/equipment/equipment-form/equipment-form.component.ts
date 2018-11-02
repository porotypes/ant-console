import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

import { EquipmentService } from '../../core/equipment/equipment.service';
import { CompanyService } from '../../core/system/company.service';

import { HttpResponseData } from 'src/app/common/http-response-data';
import { Pagination } from 'src/app/common/pagination';
import { Equipment } from 'src/app/common/equipment';
import { Company } from 'src/app/common/company';

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

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
    private companyService: CompanyService,
    private messageService: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  createForm() {
    this.equipmentForm = this.fb.group({
      equipmentId: [null, [Validators.required]],
      equipmentType: [null, [Validators.required]],
      owner: [null, [Validators.required]],
      address: [null],
      amountOfCash: [0, [Validators.required]],
      equipmentName: [null, [Validators.required]],
      hasBanknoteBox: [true, [Validators.required]],
      hasCamera: [true, [Validators.required]],
      hasCardReader: [true, [Validators.required]],
      hasPrinter: [true, [Validators.required]],
      highThreshold: [null, [Validators.required]],
      lowThreshold: [null, [Validators.required]],
      maximumCashAmount: [null, [Validators.required]],
      serialNumber: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.createForm();
    this.getAllCompanies();
    this.getCurrentEquipmentId();
  }

  getAllCompanies() {
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
        this.messageService.error(error.error.msg || '响应超时！');
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
        this.messageService.error(error.error.msg || '响应超时！');
      }
    );
  }

  populateForm(equipment: Equipment) {
    this.equipmentForm.patchValue({
      equipmentId: equipment.equipmentId,
      equipmentType: equipment.equipmentType,
      owner: equipment.owner,
      address: equipment.address,
      amountOfCash: equipment.amountOfCash,
      equipmentName: equipment.equipmentName,
      hasBanknoteBox: equipment.hasBanknoteBox,
      hasCamera: equipment.hasCamera,
      hasCardReader: equipment.hasCardReader,
      hasPrinter: equipment.hasPrinter,
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
          this.equipmentForm.controls[ i ].markAsDirty();
          this.equipmentForm.controls[ i ].updateValueAndValidity();
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
          this.messageService.success('添加成功');
          this.router.navigate(['/dashboard/equipment-list']);
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.messageService.error(error.error.msg || '响应超时！');
      }
    );
  }

  updateEquipment() {
    this.equipmentForm.value['id'] = this.currentEquipmentId;
    this.equipmentService.updateEquipment(this.equipmentForm.value).subscribe(
      (res: HttpResponseData<Pagination<Equipment>>) => {
        if (res.status === 200) {
          this.messageService.success('修改成功');
          this.router.navigate(['/dashboard/equipment-list']);
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.messageService.error(error.error.msg || '响应超时！');
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
