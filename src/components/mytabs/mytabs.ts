import { Component } from '@angular/core';
import { IonicPage,Nav,App, NavController, NavParams,Tabs, Platform } from 'ionic-angular';
import { ReservaPage } from '../../pages/reserva/reserva';
import { UbicacionPage } from '../../pages/ubicacion/ubicacion';
import { IntroPage } from '../../pages/intro/intro';
import { PerfilPage } from '../../pages/perfil/perfil';
import { LoginPage } from '../../pages/login/login';
import { LoginprincipalPage } from '../../pages/loginprincipal/loginprincipal';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HistorialPage } from '../../pages/historial/historial';
import { Storage } from '@ionic/storage';
import { RegistroPage } from '../../pages/registro/registro';

import { AyudaPage } from '../../pages/ayuda/ayuda';

/**
 * Generated class for the MytabsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mytabs',
  templateUrl: 'mytabs.html'
})
export class MytabsComponent {

  	text: string;

	myVar=true

	reservaPage: any;

	introPage: any;

	perfilPage: any;

	servicioPage:any;


  historialPage:any;


  loginPage:any;

  registroPage:any;

  logeado:any;

nologeado:any;




  constructor(private socialSharing: SocialSharing,public platform: Platform,public appCtrl: App,private storage: Storage,public navCtrl: NavController, public navParams: NavParams) {

  	this.perfilPage = PerfilPage;

  	this.introPage = IntroPage;



    this.historialPage = HistorialPage;

    this.loginPage = LoginPage;




       this.storage.get('token').then((val) => {


       console.log('Token....',val)

        this.logeado=val

        if (this.logeado==null){


          this.nologeado=true
          this.logeado=null
        }

        if(this.logeado){

          this.logeado=true
          this.nologeado=null


        
        }

       
  });
    

  }


   loginprincipal(){


    console.log('queeeee')

    this.navCtrl.push(LoginprincipalPage);
  }


  ayuda(){


    console.log('queeeee')

    this.navCtrl.push(AyudaPage);
  }


  home(){

    this.navCtrl.popToRoot();
  }
  
  




  ionViewDidLoad() {


    console.log('Entro......')



  }

 ionViewWillEnter(){



    console.log('Entro..wwww....')

    





  }
     


 salircliente(){

    console.log('saliendo..')

    this.storage.remove('token')

    this.storage.remove('grupo')
    
    //this.navCtrl.push(IntroPage);

     this.platform.exitApp();


  }

        shareSheetShare() {
    this.socialSharing.share("Registrate", "Atreveteeetee sal del closeet", "https://st2.depositphotos.com/5328332/12205/v/950/depositphotos_122057578-stock-illustration-express-delivery-of-fashion-and.jpg", "https://play.google.com/store/apps/details?id=io.codigito.mylookexpress&hl=es").then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }




}
