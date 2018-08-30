import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Tabs } from 'ionic-angular';
import { ReservaPage } from '../reserva/reserva';
import { UbicacionPage } from '../ubicacion/ubicacion';
import { VentaPage } from '../venta/venta';
import { IntroPage } from '../../pages/intro/intro';
import { PerfilPage } from '../../pages/perfil/perfil';
import { ServicioPage } from '../../pages/servicio/servicio';

import { HistorialPage } from '../../pages/historial/historial';
import { LoginPage } from '../../pages/login/login';
import { Storage } from '@ionic/storage';
/**
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {


@ViewChild('myTabs') tabRef: Tabs;

 tab1Root = IntroPage;
 tab2Root = PerfilPage;
 tab3Root = HistorialPage;



  constructor(private storage: Storage,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  salir(){

  	this.storage.remove('token') 
  }

}
