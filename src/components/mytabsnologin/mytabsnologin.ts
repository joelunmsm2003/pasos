import { Component } from '@angular/core';
import { IonicPage,Nav,App, NavController, NavParams,Tabs } from 'ionic-angular';
import { ReservaPage } from '../../pages/reserva/reserva';
import { UbicacionPage } from '../../pages/ubicacion/ubicacion';

import { PerfilPage } from '../../pages/perfil/perfil';
import { LoginPage } from '../../pages/login/login';
import { LoginprincipalPage } from '../../pages/loginprincipal/loginprincipal';

import { ServicioPage } from '../../pages/servicio/servicio';

import { AyudaPage } from '../../pages/ayuda/ayuda';
import { HistorialsociaPage } from '../../pages/historialsocia/historialsocia';
import { Storage } from '@ionic/storage';
import { RegistroPage } from '../../pages/registro/registro';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NotificacionProvider } from '../../providers/notificacion/notificacion';

/**
 * Generated class for the MytabsnologinComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mytabsnologin',
  templateUrl: 'mytabsnologin.html',
  providers: [NotificacionProvider]
})
export class MytabsnologinComponent {

	text: string;

	myVar=true

	reservaPage: any;

	introPage: any;

	compartirPage: any;

	servicioPage:any;

	configuracionPage:any;

	ayudaPage:any;

	loginPage:any;

	registroPage:any;

	logeado:any;

	nologeado:any;

  compartirdetalle:any

  loginprincipalPage:any;



  constructor(private _notificacion: NotificacionProvider,public appCtrl: App,private storage: Storage,public navCtrl: NavController, public navParams: NavParams,private socialSharing: SocialSharing) {

  

  	this.servicioPage = ServicioPage;



    this.ayudaPage = AyudaPage;

    this.loginprincipalPage = LoginprincipalPage;



   this.storage.get('token').then((val) => {


       console.log('Token....',val)

        this.logeado=val

        if (this.logeado==null){


          this.nologeado=true
        }

        if(this.logeado){

          this.logeado=true


        
        }

       
  });


    

  }

  loginprincipal(){


    console.log('queeeee')

    this.navCtrl.push(LoginprincipalPage);
  }



      shareSheetShare() {
    this.socialSharing.share("Registrate", "Atreveteeetee sal del closeet", "https://st2.depositphotos.com/5328332/12205/v/950/depositphotos_122057578-stock-illustration-express-delivery-of-fashion-and.jpg", "https://play.google.com/store/apps/details?id=io.codigito.mylookexpress&hl=es").then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }


}
