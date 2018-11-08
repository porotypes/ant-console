import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable()
export abstract class HttpService<T> {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  private getHttpHeaders(): HttpHeaders {
    if (this.storageService.readStorage('language') === 'en_US') {
      return new HttpHeaders({
        'language': 'en_US',
        'Authorization': this.storageService.readStorage('USER_TOKEN')
      });
    } else {
      return new HttpHeaders({
        'language': 'zh_CN',
        'Authorization': this.storageService.readStorage('USER_TOKEN')
      });
    }
  }

  /**
   * get pagination
   */
  public getPagination(apiUrl: string): Observable<Object> {
    const url = environment.base_url + apiUrl;
    return this.http.get(url, {headers: this.getHttpHeaders()});
  }

  /**
   * get
   */
  public get(apiUrl: string): Observable<Object> {
    const url = environment.base_url + apiUrl;
    return this.http.get(url, {headers: this.getHttpHeaders()});
  }

  /**
   * post
   */
  public post(apiUrl: string, data: any): Observable<Object> {
    const url = environment.base_url + apiUrl;
    return this.http.post(url, data, {headers: this.getHttpHeaders()});
  }

  /**
   * update
   */
  public update(apiUrl: string, data: any): Observable<Object> {
    const url = environment.base_url + apiUrl;
    return this.http.put(url, data, {headers: this.getHttpHeaders()});
  }

  /**
   * patch
   */
  public patch(apiUrl: string, id: number, data: any = null) {
    const url = `${environment.base_url}${apiUrl}/${id}`;
    return this.http.patch(url, data, {headers: this.getHttpHeaders()});
  }

  /**
   * deleted
   */
  public deleted(apiUrl: string, data: any): Observable<Object> {
    const url = environment.base_url + apiUrl + '/' + data['id'];
    return this.http.delete(url, {headers: this.getHttpHeaders()});
  }

  /**
   * download file
   */
  public download(apiUrl: string, data: any): Observable<Blob> {
    const url = environment.base_url + apiUrl;
    return this.http.post(url, data, {headers: this.getHttpHeaders(), responseType: 'blob'});
  }

  /**
   * downloadTemplate
   */
  public downloadTemplate(apiUrl: string) {
    const url = environment.base_url + apiUrl;
    return this.http.get(url, {headers: this.getHttpHeaders(), responseType: 'blob'});
  }

}
