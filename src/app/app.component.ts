import { Component, ViewChild } from '@angular/core';
import { App,Nav,NavController,Platform, AlertController,Config,ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http,RequestOptions, Headers } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PerfilPage } from '../pages/perfil/perfil';
import { ServicioPage } from '../pages/servicio/servicio';

import { IntroPage } from '../pages/intro/intro';
import { LoginprincipalPage } from '../pages/loginprincipal/loginprincipal';
import { LoginPage } from '../pages/login/login';
import { DetalleservicioPage } from '../pages/detalleservicio/detalleservicio';
import { AlertaPage } from '../pages/alerta/alerta';
import { HistorialsociaPage } from '../pages/historialsocia/historialsocia';

import { FinalizaservicioPage } from '../pages/finalizaservicio/finalizaservicio';
import { InicioPage } from '../pages/inicio/inicio';
import { Storage } from '@ionic/storage';
import { AuthHttp, tokenNotExpired,JwtHelper } from 'angular2-jwt';
import { OneSignal } from '@ionic-native/onesignal';
import { PerfilProvider } from '../providers/perfil/perfil';

// import { AuthService } from "angular4-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
// import { SocialUser } from "angular4-social-login";
import { ServerProvider } from '../providers/server/server';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

  data:any;



  c:any;

  public grupo:any;

  //private user: SocialUser;
  
  private loggedIn: boolean;


  pages: Array<{title: string, component: any}>;

  
  navCtrl:NavController

    
   constructor(public modalCtrl: ModalController,public server:ServerProvider,public http: Http,private _perfil: PerfilProvider,private storage:Storage,private alertCtrl: AlertController,private authHttp: AuthHttp,public appCtrl: App,public platform: Platform,private oneSignal: OneSignal, public statusBar: StatusBar, public splashScreen: SplashScreen){

    this.pages = [
      { title: 'Homepage', component: PerfilPage },
      { title: 'Settings', component: IntroPage },
      { title: 'Account', component: ServicioPage }
    ];

     this.rootPage=HomePage



    //  this.authService.authState.subscribe((user) => {

     
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });




     this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.handlerNotifications();


    });


  }



   ionViewWillEnter(){


    console.log('App components.','ionViewWillEnter')

  }



  

 




  private handlerNotifications(){





  this.oneSignal.startInit('6d06ccb5-60c3-4a76-83d5-9363fbf6b40a', '466431784640')
  this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
  this.oneSignal.handleNotificationOpened()
  .subscribe(jsonData => {



     if(jsonData.notification.payload.additionalData.servicio){


    // let alert = this.alertCtrl.create({
    //   title: 'Tienes un nuevo servicio',
    //   subTitle: 'Codigo: '+jsonData.notification.payload.additionalData.servicio,
    //   buttons: ['OK']
    // });

    // alert.present();

    
      this.appCtrl.getRootNav().push(AlertaPage, { servicio: jsonData.notification.payload.additionalData.servicio });
      
    }

     if(jsonData.notification.payload.additionalData.aceptaservicio){

       

      this.appCtrl.getRootNav().push(DetalleservicioPage, { servicio: jsonData.notification.payload.additionalData.aceptaservicio })
      
    }


     if(jsonData.notification.payload.additionalData.finalizaservicio){

       

     // this.appCtrl.getRootNav().push(FinalizaservicioPage, { servicio: jsonData.notification.payload.additionalData.finalizaservicio })


     this.finalizaModal(jsonData.notification.payload.additionalData.finalizaservicio)

      
    }


     if(jsonData.notification.payload.additionalData.codigo){


         let code = this.alertCtrl.create({
      title: 'No te olvide de My Look Xpress',
      subTitle: 'Buenas tardes',
      buttons: ['OK']
    });

    code.present();




        let creds = JSON.stringify(jsonData);

      let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
      });


      this.authHttp.post(this.server.getMyGlobalVar()+'guardanotificacion/',creds,options)
      .subscribe(

      data => {

          console.log(data)

       }

      );

     }


    





      
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });


  this.oneSignal.endInit();
}




finalizaModal(servicio) {




   let profileModal = this.modalCtrl.create(FinalizaservicioPage, { servicio:servicio});
   profileModal.onDidDismiss(data => {
     
        


   });
   profileModal.present();



 }






  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

////

// Add the following to your existing ready fuction.

