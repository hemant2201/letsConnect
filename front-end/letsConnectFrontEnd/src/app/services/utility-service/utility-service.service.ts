import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { getLocaleDateFormat } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class UtilityServiceService {
  constructor(private http: HttpClient) {}

  getData(url:string){
    return this.http.get(url);
  }

  postdata(url:string,body:any)
  {
    return this.http.post(url,body);
  }

  
  userInfo: object = {};
}
