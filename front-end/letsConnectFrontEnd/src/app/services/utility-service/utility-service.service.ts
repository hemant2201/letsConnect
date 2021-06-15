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
  baseUrl: string = 'http://localhost:3000';
  selfProfileMode: boolean = false;
  getData(url: string) {
    return this.http.get(url);
  }

  postdata(url: string, body: any) {
    return this.http.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getSelfFeed(): void {
    this.selfProfileMode = true;
  }

  userInfo: object = {};
}
