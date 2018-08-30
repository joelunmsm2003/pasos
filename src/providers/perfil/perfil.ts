import { HttpClient } from '@angular/common/http';
import { Http , Response,RequestOptions,Headers } from '@angular/http';
//import { RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { NavController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { AuthHttp, tokenNotExpired,JwtHelper } from 'angular2-jwt';
import { ServerProvider } from '../../providers/server/server';
//import { HomePage } from '../../pages/home/home';


/*
  Generated class for the PerfilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PerfilProvider {

//private nav: NavController,public storage: Storage,
	
  constructor(public storage: Storage,private authHttp: AuthHttp,public _http: HttpClient,public server:ServerProvider) {
    console.log('Hello PerfilProvider Provider');
  }


   miperfil(): Observable<User[]> {
      return this.authHttp.get(this.server.getMyGlobalVar()+'miperfil/')
      .map((response: Response) => <User[]> response.json())

   }


    getperfil() {
    return this.authHttp.get(this.server.getMyGlobalVar()+'miperfil/').map((res) => {
      return res.json();
    } );
  }

   enviasms(telefono) {
    return this.authHttp.get(this.server.getMyGlobalVar()+'enviasms/'+telefono).map((res) => {
      return res.json();
    } );
  }



    actualiza(data) {


        return this.authHttp.post(this.server.getMyGlobalVar()+'actualizaperfil/', JSON.stringify({ cliente: data }))
            .map((response: Response) => {


              
                
                return response.json();
                
            });
   

        }


    validauser(data) {


        return this.authHttp.post(this.server.getMyGlobalVar()+'validauser/', JSON.stringify({ cliente: data }))
            .map((response: Response) => {
                
                return response.json();
                
            });
   

        }

      



}
