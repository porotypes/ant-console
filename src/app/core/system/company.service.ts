import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Company } from '../../common/company';
import { Pagination } from '../../common/pagination';

@Injectable()
export class CompanyService extends HttpService<Company> {

  private URL = 'company';

  getCompanyList(pagination: Pagination<Company>) {
    const url = `${this.URL}/listAllCompanies/${pagination.pages}/${pagination.size}`;
    return super.getPagination(url);
  }

  searchCompany(pagination: Pagination<Company>, companyName: string) {
    const url = `${this.URL}/get/${companyName}/${pagination.pages}/${pagination.size}`;
    return super.getPagination(url);
  }

  getCompany(id: number) {
    const url = `${this.URL}/${id}`;
    return super.get(url);
  }

  addCompany(company: Company) {
    const url = `${this.URL}/add`;
    return super.post(url, company);
  }

  updateCompany(company: Company) {
    const url = `${this.URL}/update`;
    return super.post(url, company);
  }

  deleteCompany(company: Company) {
    const url = `${this.URL}/deleteCompany/`;
    return super.deleted(url, company);
  }
}
