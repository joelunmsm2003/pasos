import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthHttp, tokenNotExpired,JwtHelper } from 'angular2-jwt';

import { Http , Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { Noti } from './noti';

/*
  Generated class for the NotificacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class NotificacionProvider {

  constructor(private authHttp: AuthHttp,public _http: HttpClient) {
    console.log('Hello ServiciosProvider Provider');
  }


 
}
