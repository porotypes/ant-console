import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { CompanyService } from '../../core/system/company.service';
import { HttpResponseData } from '../../common/http-response-data';
import { Company } from '../../common/company';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  companyForm: FormGroup;
  currentCompanyId: number;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private messageService: NzMessageService
  ) { }

  private createForm() {
    this.companyForm = this.fb.group({
      companyFullName: [null, [Validators.required]],
      companyShortName: [null],
      address: [null],
      contact: [null],
      phone: [null],
      email: [null, [Validators.required, Validators.email]],
      port: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.createForm();
    this.currentCompanyId = this.route.params['value'].id;
    if (this.currentCompanyId > 0) {
      this.getCompany();
    }
  }

  getCompany() {
    this.companyService.getCompany(this.currentCompanyId).subscribe(
      (res: HttpResponseData<Company>) => {
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

  private populateForm(company: Company) {
    this.companyForm.patchValue({
      companyFullName: company.companyFullName,
      companyShortName: company.companyShortName,
      address: company.address,
      contact: company.contact,
      phone: company.phone,
      email: company.email,
      port: company.port
    });
  }

  submitForm() {
    if (!this.companyForm.valid) {
      for (const i in this.companyForm.controls) {
        if (this.companyForm.controls.hasOwnProperty(i)) {
          this.companyForm.controls[ i ].markAsDirty();
          this.companyForm.controls[ i ].updateValueAndValidity();
        }
      }
      return;
    }
    this.isSaving = true;
    if (this.currentCompanyId) {
      this.updateCompany();
    } else {
      this.addCompany();
    }
  }

  addCompany() {
    this.companyService.addCompany(this.companyForm.value).subscribe(
      (res: HttpResponseData<Company>) => {
        this.isSaving = false;
        if (res.status === 200) {
          this.messageService.success(res.msg);
          this.router.navigate(['/dashboard/company-management']);
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.isSaving = false;
        this.messageService.error(error.error.msg || '响应超时！');
      }
    );
  }

  updateCompany() {
    this.companyForm.value['id'] = this.currentCompanyId;
    this.companyService.updateCompany(this.companyForm.value).subscribe(
      (res: HttpResponseData<Company>) => {
        this.isSaving = false;
        if (res.status === 200) {
          this.messageService.success(res.msg);
          this.router.navigate(['/dashboard/company-management']);
        } else {
          this.messageService.error(res.msg);
        }
      },
      error => {
        this.isSaving = false;
        this.messageService.error(error.error.msg || '响应超时！');
      }
    );
  }

}
