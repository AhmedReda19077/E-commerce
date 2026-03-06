import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
import { User } from '../../interfaces/user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }
  // private httpClient : HttpClient = inject(HttpClient)
  userDate = new BehaviorSubject(null);

  registerAPI(bodyData: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/signup`, bodyData)
  }

  loginAPI(bodyData: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/signin`, bodyData)
  }

  setUserData() {
    this.userDate.next(jwtDecode(localStorage.getItem("userToken")!))
    console.log(this.userDate.getValue)
  }
}
