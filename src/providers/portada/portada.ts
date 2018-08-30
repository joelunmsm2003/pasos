import { HttpClient } from '@angular/common/http';
import { Http , Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { Foto } from './foto';
import { ServerProvider } from '../../providers/server/server';



@Injectable()
export class PortadaProvider {

  constructor(public _http: Http,public server:ServerProvider) {
    console.log('Hello PortadaProvider Provider');
  }

    getfotosdeportada(sexo): Observable<Foto[]> {
      return this._http.get(this.server.getMyGlobalVar()+'portadaphoto/'+sexo)
      .map((response: Response) => <Foto[]> response.json())

   }


   getfotosdepublicidad(): Observable<Foto[]> {
      return this._http.get(this.server.getMyGlobalVar()+'publicidad')
      .map((response: Response) => <Foto[]> response.json())

   }

}
