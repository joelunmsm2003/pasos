import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Http,RequestOptions, Headers } from '@angular/http';
import { AuthHttp, tokenNotExpired,JwtHelper } from 'angular2-jwt';
/**
 * Generated class for the PagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pago',
  templateUrl: 'pago.html',
})
export class PagoPage {

  constructor(private authHttp: AuthHttp,private view:ViewController,public navCtrl: NavController, public navParams: NavParams) {


  	

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagoPage');
  }

   closeModal(){

  this.view.dismiss()
}

pagar(){


	 let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    });


	 let creds = JSON.stringify({ categoria: '99', socia: 'data' });




  this.authHttp.post('http://104.236.247.3:8000/creatoken/', creds, options)
    .subscribe(
      data => {


      }
 
    );



}

 












}
