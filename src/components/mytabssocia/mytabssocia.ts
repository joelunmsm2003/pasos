import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Tabs,Platform } from 'ionic-angular';
import { ReservaPage } from '../../pages/reserva/reserva';
import { UbicacionPage } from '../../pages/ubicacion/ubicacion';
import { IntroPage } from '../../pages/intro/intro';
import { PerfilPage } from '../../pages/perfil/perfil';
import { LoginPage } from '../../pages/login/login';
import { ServicioPage } from '../../pages/servicio/servicio';

import { HistorialPage } from '../../pages/historial/historial';
import { HistorialsociaPage } from '../../pages/historialsocia/historialsocia';
import { Storage } from '@ionic/storage';
import { RegistroPage } from '../../pages/registro/registro';
/**
 * Generated class for the MytabsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mytabssocia',
  templateUrl: 'mytabssocia.html'
})
export class MytabssociaComponent {

  	text: string;

	myVar=true

	reservaPage: any;

	introPage: any;

	perfilPage: any;

	servicioPage:any;

	configuracionPage:any;

	historialPage:any;

	historialsociaPage:any;

	loginPage:any;

	registroPage:any;

  constructor(public platform:Platform,private storage: Storage,public navCtrl: NavController, public navParams: NavParams) {

  	this.perfilPage = PerfilPage;

  	this.introPage = IntroPage;

  	this.servicioPage = ServicioPage;


    this.historialPage = HistorialPage;

    this.historialsociaPage = HistorialsociaPage;

    this.loginPage = LoginPage;

    
  }

  salir(){

    this.storage.remove('token')

    this.storage.remove('grupo')

    this.navCtrl.push(IntroPage);

    this.platform.exitApp();
  }

}
