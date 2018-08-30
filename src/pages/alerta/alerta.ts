import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthHttp, tokenNotExpired,JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { SpinnerProvider } from '../../providers/spinner/spinner'
import { MapProvider } from '../../providers/map/map';
import { ReservaPage } from '../reserva/reserva';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { Http,RequestOptions, Headers } from '@angular/http';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()

@Component({
  selector: 'page-alerta',
  templateUrl: 'alerta.html',
  providers:[ServerProvider]
})
export class AlertaPage {


  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;

  map: any;
  address = '';
  reservaPage: any;
  ubicacion:any;

 
  host:any;

  ped:any;
  photo_cliente:any;

  latitud:any;
  longitud:any;
  nombre_cliente:any;
  pedidos:any;
  serv:any;

  constructor(private view:ViewController,public server:ServerProvider,private authHttp: AuthHttp,public _servicio:ServiciosProvider,public storage: Storage,public navCtrl: NavController,
    public geolocation: Geolocation,
    public zone: NgZone,
    public platform: Platform,
    public localStorage: Storage,
    public mapService: MapProvider,
    public spinner: SpinnerProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams) {

      this.reservaPage = ReservaPage;

    

     
      this.host=this.server.getMyGlobalVar()


  }


closeModal(){

  this.view.dismiss()
}


  

  

  

  



}

