import { HttpClient } from '@angular/common/http';
import { Http , Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { AuthHttp, tokenNotExpired,JwtHelper } from 'angular2-jwt';
import { Servicio } from './servicio';
import { ServerProvider } from '../../providers/server/server';


/*
  Generated class for the ServiciosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiciosProvider {

  constructor(private authHttp: AuthHttp,public _http: HttpClient,public server:ServerProvider) {
    console.log('Hello ServiciosProvider Provider');
  }

   getservicios(): Observable<Servicio[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'miservicios/')
      .map((response: Response) => <Servicio[]> response.json())

   }

    detalleservicio(id_servicio): Observable<Servicio[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'detalleservicio/'+id_servicio)
      .map((response: Response) => <Servicio[]> response.json())

   }

   ultimoservicio(): Observable<Servicio[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'ultimoservicio/')
      .map((response: Response) => <Servicio[]> response.json())

   }

   serviciosdesocias(): Observable<Servicio[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'miserviciossocias/2')
      .map((response: Response) => <Servicio[]> response.json())
   }

   aceptaservicio(id_servicio): Observable<Servicio[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'aceptaserviciocliente/'+id_servicio)
      .map((response: Response) => <Servicio[]> response.json())
   }


      cancelarservicio(id_servicio): Observable<Servicio[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'cancelaserviciocliente/'+id_servicio)
      .map((response: Response) => <Servicio[]> response.json())
   }

    pagarenefectivo(id_servicio): Observable<Servicio[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'pagarenefectivo/'+id_servicio)
      .map((response: Response) => <Servicio[]> response.json())
   }

   pagotulki(id_servicio): Observable<Servicio[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'pagotulki/'+id_servicio)
      .map((response: Response) => <Servicio[]> response.json())
   }


   pagoyape(id_servicio): Observable<Servicio[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'pagoyape/'+id_servicio)
      .map((response: Response) => <Servicio[]> response.json())
   }

  promo(promo,id_servicio): Observable<Servicio[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'promo/'+promo+'/'+id_servicio)
      .map((response: Response) => <Servicio[]> response.json())
   }

     eliminaservicio(id_servicio): Observable<Servicio[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'eliminaservicio/'+id_servicio)
      .map((response: Response) => <Servicio[]> response.json())
   }

   listasocias(data): Observable<Servicio[]> {
      return this.authHttp.post(this.server.getMyGlobalVar()+'listasocias/',data)
      .map((response: Response) => <Servicio[]> response.json())
   }




}
