import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { User } from '../../providers/perfil/user';
import { Device } from '@ionic-native/device';
import { Http,RequestOptions, Headers } from '@angular/http';
import { AuthHttp, tokenNotExpired,JwtHelper } from 'angular2-jwt';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the ServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicio',
  templateUrl: 'servicio.html',
  providers:[ServerProvider]
})
export class ServicioPage {

	options:any;

  constructor(public server:ServerProvider,private authHttp: AuthHttp,private http: Http,public device:Device,public navCtrl: NavController, public navParams: NavParams) {



  		let creds = JSON.stringify({ model: this.device.model ,tipo:this.device.version });


 	let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    });


  this.authHttp.post(this.server.getMyGlobalVar()+'guardadatosmovil/', creds, options)
    .subscribe(
      data => {

     

 		console.log(data)
      

      }
 
    );


  }

  ionViewDidLoad() {


    console.log('ionViewDidLoad ServicioPage');

     


  }



  home(){


    this.navCtrl.popToRoot();
  }



  


}
