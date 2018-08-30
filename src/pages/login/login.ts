import { Component,ViewChild } from '@angular/core';
import { Http,RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Injectable } from '@angular/core';
import { AuthHttp, tokenNotExpired,JwtHelper } from 'angular2-jwt';

import { IntroPage } from '../../pages/intro/intro';
import { TabsPage } from '../../pages/tabs/tabs';
import { RegistroPage } from '../../pages/registro/registro';
import { HistorialsociaPage } from '../../pages/historialsocia/historialsocia';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ModalController,App,IonicPage, NavController, NavParams,Nav,ViewController,AlertController,ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';
import { ServerProvider } from '../../providers/server/server';
import { ServicioPage } from '../servicio/servicio';

//import { AuthService } from "angular4-social-login";
//import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
 


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface Credentials {
  username: string,
  password: string
}

export class User {
  constructor(
    public username: string,
    public password: string
  ) {  }
}


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[ServerProvider]
})
export class LoginPage {




    



   registrosociaPage:any;
   loginPage:any;

  isLoggedIn:boolean = false;
  users: any;


 credentials: Credentials;

  introPage: any;

  registroPage:any;

  grupo:any;

  @ViewChild(Nav) nav: Nav;


   model = new User(null,null);

   


  constructor(public server:ServerProvider,public toastCtrl: ToastController,private fb: Facebook,public alertCtrl: AlertController,private view:ViewController,private _perfil: PerfilProvider,public appCtrl: App,private http: Http, private authHttp: AuthHttp,public storage: Storage) {




    this.cargandoregistro()


    
    this.registroPage=RegistroPage

  }

    ionViewWillEnter() {

          console.log('Will....Enter')

      
   }

    ionViewDidEnter(){


     console.log('Did....Enter')


      //this.storage.get('token').then((val) => {if(val){this.appCtrl.getRootNav().push(IntroPage);}});



  }



  //     signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
 
  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
 
  // signOut(): void {
  //   this.authService.signOut();
  // }
    





     nologin() {



    let alert = this.alertCtrl.create({
      title: 'My Look Xpress',
      subTitle: 'Usuario o contraseña incorrecta',
      buttons: ['Cerrar']
    });
    alert.present();
  }


//Facebook


 cargandoregistro() {
    let toast = this.toastCtrl.create({
      message: 'Registrarte con Facebook o por correo',
      duration: 4000
    });
    toast.present();
  }



  login() {
  this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if(res.status === "connected") {
        this.isLoggedIn = true;
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
}

logout() {
  this.fb.logout()
    .then( res => this.isLoggedIn = false)
    .catch(e => console.log('Error logout from Facebook', e));
}


getUserDetail(userid) {
  this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
    .then(res => {

    
      this.users = res;


      let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
      });

      let creds = JSON.stringify({ users: this.users});


      this.http.post(this.server.getMyGlobalVar()+'/loginfacebook/', creds, options)
      .subscribe(
        data => {

      

          let creds = JSON.stringify({ username: JSON.parse(data['_body'])['email'], password: JSON.parse(data['_body'])['id_face']+JSON.parse(data['_body'])['gender']});

        
          this.http.post(this.server.getMyGlobalVar()+'api-token-auth/', creds, options)
                  .subscribe(
                    data => {


                       this.storage.set('token', JSON.parse(data["_body"]).token)

                       this.view.dismiss()
                               
                                }
                           
                              );

        })


    


    })
    .catch(e => {
      console.log(e);
    });
}


///Fin









  public authenticate(username, password) {


   console.log('ingresando...')

  let creds = JSON.stringify({ username: username, password: password });



  let jwtHelper: JwtHelper = new JwtHelper();

  let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

  // sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

  this.http.post(this.server.getMyGlobalVar()+'api-token-auth/', creds, options)
    .subscribe(
      data => {

          console.log('status',data.status)

         this.storage.set('token', JSON.parse(data["_body"]).token)

         if(data.status==200){

                 this.view.dismiss()

                 console.log('Redirigiendo...')
                 sleep(200).then(() => {


                          //this.appCtrl.getRootNav().push(IntroPage);



                           


                  });
           
                 
         }

 
       
         console.log('jwtHelper',JSON.stringify(jwtHelper.decodeToken(JSON.parse(data["_body"]).token)))

      },
      error=>{

        this.nologin()
      }
 
    );

}




closeModal(){

  this.view.dismiss()
}




}
