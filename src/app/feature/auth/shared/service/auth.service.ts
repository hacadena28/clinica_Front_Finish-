import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from "@core/services/http.service";
import {environment} from "@env/environment";
import {UserLoginDto} from "../models/create-patient.interface";


@Injectable()
export class AuthService {

  constructor(protected http: HttpService) { }

  public login(credentials: any): Observable<UserLoginDto>{
    return this.http.doPost<any, UserLoginDto>(`${environment.appUrl}user/auth`, credentials);
  }
}
