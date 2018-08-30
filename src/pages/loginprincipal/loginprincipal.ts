import { Component,ViewChild } from '@angular/core';
import { Http,RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Injectable } from '@angular/core';
import { AuthHttp, tokenNotExpired,JwtHelper } from 'angular2-jwt';

import { IntroPage } from '../../pages/intro/intro';

import { InicioPage } from '../../pages/inicio/inicio';
import { HomePage } from '../../pages/home/home';
import { TabsPage } from '../../pages/tabs/tabs';
import { HistorialsociaPage } from '../../pages/historialsocia/historialsocia';
import { PerfilProvider } from '../../providers/perfil/perfil';

import { App,IonicPage, NavController,Nav,ViewController,AlertController,ToastController,NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { Storage } from '@ionic/storage';
import { RegistroprincipalPage } from '../registroprincipal/registroprincipal';
import { ServerProvider } from '../../providers/server/server';
import { SpinnerProvider } from '../../providers/spinner/spinner'

//import { AuthService } from "angular4-social-login";
//import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
//import { SocialUser } from "angular4-social-login";

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
  selector: 'page-loginprincipal',
  templateUrl: 'loginprincipal.html',
  providers:[ServerProvider]
})
export class LoginprincipalPage {


 credentials: Credentials;

  introPage: any;

  registroPage:any;

  loginPage:any;

  //private user: SocialUser;
  
  //private loggedIn: boolean;

  isLoggedIn:boolean = false;

  users: any;


  registroprincipalPage:any;

  registrosociaPage:any;

  grupo:any;

  //@ViewChild(Nav) nav: Nav;


   model = new User(null,null);
   email:any;
   telefono:any;
   nombre:any;
   cliente:any={};

   


  constructor(public spinner: SpinnerProvider,public server:ServerProvider,private nav: NavController,public navParams: NavParams,public toastCtrl: ToastController,private fb: Facebook,public navCtrl: NavController,public alertCtrl: AlertController,private view:ViewController,private _perfil: PerfilProvider,public appCtrl: App,private http: Http, private authHttp: AuthHttp,public storage: Storage) {

    
    this.registroprincipalPage=RegistroprincipalPage






  }



  //  signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
 
  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);


  //   console.log('datos')


  //    this.authService.authState.subscribe((user) => {

  //     console.log('user...social',user)

  //     this.user = user;

  //     this.loggedIn = (user != null);

  //     //Conexion con Django

  //     let options: RequestOptions = new RequestOptions({
  //     headers: new Headers({ 'Content-Type': 'application/json' })
  //     });

  //     let creds = JSON.stringify({ users: this.user});


  //     this.http.post(this.server.getMyGlobalVar()+'loginfacebook/', creds, options)
  //     .subscribe(
  //       data => {

      

  //         let creds = JSON.stringify({ username: JSON.parse(data['_body'])['email'], password: JSON.parse(data['_body'])['id_face']+JSON.parse(data['_body'])['gender']});

        
  //         this.http.post(this.server.getMyGlobalVar()+'api-token-auth/', creds, options)
  //                 .subscribe(
  //                   data => {


  //                      this.storage.set('token', JSON.parse(data["_body"]).token)

  //                       this.nav.setRoot(HomePage, {statuslogin: true});
                               
  //                               }
                           
  //                             );

  //       })







    

  //   });


  // }
 
  // signOut(): void {
  //   this.authService.signOut();
  // }
    


    ionViewWillEnter() {

    	console.log('loginprincipal,ionViewWillEnter')

      

      
   }

    ionViewWillLoad() {

      console.log('loginprincipal LOAD')

      

      
   }

   ionViewDidEnter(){


     console.log('Did....Enter')


      //this.storage.get('token').then((val) => {if(val){this.appCtrl.getRootNav().push(IntroPage);}});



  }



  cerrar(){

     this.nav.setRoot(HomePage, {statuslogin: false});
  }


     nologin() {



    let alert = this.alertCtrl.create({
      title: 'My Look Xpress',
      subTitle: 'Usuario o contraseña incorrecta',
      buttons: ['Cerrar']
    });
    alert.present();
  }


  registra(){

      this.appCtrl.getRootNav().push(RegistroprincipalPage);
  }


  sacatelefono() {


    console.log('sacatelefono...',this.telefono)


    if (this.telefono==null){

                  let alert = this.alertCtrl.create({
              title: 'A que celular podemos comunicarnos?',
              inputs: [
                {
                  name: 'telefono',
                  placeholder: 'Telefono'
                },
               
              ],
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: data => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Enviar',
                  handler: data => {
                   
                     this.actualiza(this.nombre,this.email,data.telefono)


                  }
                }
              ]
            });
            alert.present();




    }
    
  }

   actualiza(nombre,email,telefono){
 

    this.cliente.nombre=nombre
    this.cliente.email=email
    this.cliente.telefono=telefono


    this._perfil.actualiza(this.cliente)
      .subscribe(data => {

          this.actualizatoast() 

      })

  }





    actualizatoast() {
    let toast = this.toastCtrl.create({
      message: 'Bienvenid@ a My Look Xpress',
      duration: 4000
    });
    toast.present();
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

        alert(res.authResponse.userID)
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));




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


      this.http.post(this.server.getMyGlobalVar()+'loginfacebook/', creds, options)
      .subscribe(
        data => {

      



          let creds = JSON.stringify({ username: JSON.parse(data['_body'])['email'], password: JSON.parse(data['_body'])['id_face']+JSON.parse(data['_body'])['gender']});

        
          this.http.post(this.server.getMyGlobalVar()+'api-token-auth/', creds, options)
                  .subscribe(
                    data => {


                       this.storage.set('token', JSON.parse(data["_body"]).token)

                        ////Saca telefono

                       this._perfil.miperfil()
                              .subscribe(data => {

                                  this.email=data[0]['email']                                 
                                  this.nombre=data[0]['nombre']
                                  this.sacatelefono() 


                              })




                        this.nav.setRoot(HomePage, {statuslogin: true});
                               
                                }
                           
                              );

        })


    


    })
    .catch(e => {
      console.log(e);
    });
}


///Fin



cargando(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 4000
    });
    toast.present();
  }



  public authenticate(username, password) {

    this.spinner.load();

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


         this.storage.set('token', JSON.parse(data["_body"]).token)

         if(data.status==200){

              

                 console.log('Redirigiendo...')
                 sleep(200).then(() => {

                               //this.view.dismiss()

                               this.spinner.dismiss();
                               this.nav.setRoot(HomePage, {statuslogin: true});
                                
                                //this.appCtrl.getRootNav().push(IntroPage);
                                //this.navCtrl.pop();

                    

                  });
           
                 
         }

 
       
         console.log('jwtHelper',JSON.stringify(jwtHelper.decodeToken(JSON.parse(data["_body"]).token)))

      },
      error=>{

        this.cargando(error)

        this.spinner.dismiss();
      }
 
    );

}








}
