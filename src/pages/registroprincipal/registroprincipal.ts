import { Component, ViewChild } from '@angular/core';
import { App,Nav ,IonicPage, NavController, NavParams,ViewController,AlertController,ToastController,ModalController} from 'ionic-angular';
import { Http,RequestOptions, Headers } from '@angular/http';
import { IntroPage } from '../../pages/intro/intro';
import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';
import { RegistrofinalPage } from '../../pages/registrofinal/registrofinal';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HistorialsociaPage } from '../../pages/historialsocia/historialsocia';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { UbicacionPage } from '../../pages/ubicacion/ubicacion';
import { ServerProvider } from '../../providers/server/server';
//import { AuthService } from "angular4-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
// import { SocialUser } from "angular4-social-login";
// import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registroprincipal',
  templateUrl: 'registroprincipal.html',
  providers:[ServerProvider]
})
export class RegistroprincipalPage {

  private todo : FormGroup;

  registrosociaPage:any;
  loginPage:any;

  isLoggedIn:boolean = false;
  users: any;
  user:any={};
  telefono:any;
  activa:boolean=false;
  codigo:any;
  loger:any=1;

  //private userface: SocialUser;

  private loggedIn: boolean;


  //@ViewChild('myInput') myInput



  constructor(private nav: NavController,public modalCtrl: ModalController,public server:ServerProvider,public toastCtrl: ToastController,private fb: Facebook,public storage: Storage,private _perfil: PerfilProvider,public alertCtrl: AlertController,private view:ViewController,private formBuilder: FormBuilder,public appCtrl: App,private http: Http,public navCtrl: NavController, public navParams: NavParams) {

    //Telefono


    //this.keyboard.show();

    //this.activa=true;





   this.storage.get('telefono').then((val) => {

     this.telefono=val

     this.user.telefono=this.telefono


   })

    ///Facebook

    //   fb.getLoginStatus()
    // .then(res => {
    //   console.log(res.status);
    //   if(res.status === "connect") {
    //     this.isLoggedIn = true;
    //   } else {
    //     this.isLoggedIn = false;
    //   }
    // })
    // .catch(e => console.log(e));

    //this.cargandoregistro()



    ///


     this.todo = this.formBuilder.group({
      email: ['', Validators.required],
      nombre: [''],
      telefono:[''],
     

    });

      this.loginPage=LoginPage


  }


  


  //   signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
 
  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);


  //   console.log('datos')


  //    this.authService.authState.subscribe((user) => {

  //     console.log('user...social',user)

  //     this.userface = user;

  //     this.loggedIn = (user != null);

  //     //Conexion con Django

  //     let options: RequestOptions = new RequestOptions({
  //     headers: new Headers({ 'Content-Type': 'application/json' })
  //     });

  //     let creds = JSON.stringify({ users: this.userface});


  //     this.http.post(this.server.getMyGlobalVar()+'loginfacebook/', creds, options)
  //     .subscribe(
  //       data => {

      

  //         let creds = JSON.stringify({ username: JSON.parse(data['_body'])['email'], password: JSON.parse(data['_body'])['id_face']+JSON.parse(data['_body'])['gender']});

        
  //         this.http.post(this.server.getMyGlobalVar()+'api-token-auth/', creds, options)
  //                 .subscribe(
  //                   data => {


  //                      this.storage.set('token', JSON.parse(data["_body"]).token)


                       
  //                      this.view.dismiss()

                               
  //                               }
                           
  //                             );

  //       })







    

  //   });


  // }


  
  
  //   ngAfterViewChecked(){

  // this.myInput.setFocus();

  //  }
  // ionViewDidLoad() {

  //   setTimeout(() => {
  //    this.myInput.setFocus();
  //  },150);

  // }
  cargandoregistro() {
    let toast = this.toastCtrl.create({
      message: 'Registrarte con Facebook o por correo',
      duration: 4000
    });
    toast.present();
  }

//  modelChanged(newObj) {
//     console.log(newObj)


//   this._perfil.validauser(newObj)
//       .subscribe(data => {


//           console.log(data)

//           this.loger=data

//           if(data==0){

//             this.telefonorepetido()

//              this.autentifica(newObj,'rosa0000')

           
//           }


//       })
// }



   autentifica(username,password){


console.log('autentificando...')
             let creds = JSON.stringify({ username:username,password: password });

             let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
      });

            console.log(creds)


              return this.http.post(this.server.getMyGlobalVar()+'api-token-auth/', creds,options)
                  .subscribe(
                    data => {


                       this.storage.set('token', JSON.parse(data["_body"]).token)

                       this.view.dismiss()

                       
                        this.nav.setRoot(HomePage, {statuslogin: true});
                               
                                }
                           
                              );
                           
                              
        }


  telefonorepetido() {
    let toast = this.toastCtrl.create({
      message: 'Tu numero ya esta registrado',
      duration: 4000
    });
    toast.present();
  }


  toast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 4000,
      position:'bottom'
    });
    toast.present();
  }

  codigoincorrecto() {
    let toast = this.toastCtrl.create({
      message: 'Lo sentimos no es el codigo correcto',
      duration: 4000,
      position:'bottom'
    });
    toast.present();
  }

  


  sms(data){

    this.activa=true
    console.log(data)

    //this.sacatelefono()
    
    this.nav.setRoot(RegistrofinalPage, {statuslogin: false});


  }
//Facebook

//   login() {
//   this.fb.login(['public_profile', 'user_friends', 'email'])
//     .then(res => {
//       if(res.status === "connected") {
//         this.isLoggedIn = true;
//         this.getUserDetail(res.authResponse.userID);
//       } else {
//         this.isLoggedIn = false;
//       }
//     })
//     .catch(e => console.log('Error logging into Facebook', e));
// }

// logout() {
//   this.fb.logout()
//     .then( res => this.isLoggedIn = false)
//     .catch(e => console.log('Error logout from Facebook', e));
// }


getUserDetail(userid) {
  this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
    .then(res => {

    
      this.users = res;






      let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
      });

      let creds = JSON.stringify({ users: this.users,telefono:this.telefono});


      this.http.post(this.server.getMyGlobalVar()+'loginfacebook/', creds, options)
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



  logFormx(telefono) {
     
     //this.myInput.blur()
    // this.removeFocus()
    //this.keyboard.close();





    //console.log(this.myInput)
    //this.sacatelefono()
  }

    showAlert(data) {

      console.log(data)

    let alert = this.alertCtrl.create({
      title: 'My Look Xpress',
      subTitle: 'Bienvenido, porfavor ingresa',
      buttons: ['OK']
    });
    alert.present();
  }



    emailrepetido() {

      

    let alert = this.alertCtrl.create({
      title: 'My Look Xpress',
      subTitle: 'Este correo ya existe porfavor escoja otra',
      buttons: ['Cerrar']
    });
    alert.present();
  }

  closeModal(){

  this.view.dismiss()
}


  sacatelefono(env) {


    console.log('sacatelefono...',this.telefono,'8888')


                this.toast('Se le envio un SMS con un codigo de confirmacion de 3 digitos')


                  let alert = this.alertCtrl.create({
              title: 'Ingrese codigo de confirmacion',
              enableBackdropDismiss:false,
              inputs: [
                {
                  name: 'codigo',
                  placeholder: 'Codigo'
                },
               
              ],
              buttons: [


                {
                  text: 'Cerrar',
                  role:'cancel',
                  handler: data => {
                    console.log('Cancel clicked');
                    
                  }
                },
         
                {
                  text: 'Enviar',
                  handler: data => {

                    console.log('enviando..',data.codigo,this.codigo)

                    //this.logForm(env)



                    if(parseInt(this.codigo)==parseInt(data.codigo)){


                      this.logForm(env)

                      alert.dismiss()

                    }
                    else{

                      this.codigoincorrecto()
                    }

                    return false;
                   
                   
                  }
                }
              ]
            });
            alert.present();



   



  }



ingresa(env){


  console.log('Ingrese.....',env.telefono)


   //this.logForm(env)

  this._perfil.enviasms(env.telefono)
      .subscribe(data => {


        this.codigo=data.codigo


        this.storage.set('codigosms', this.codigo)


        console.log('CODID..',data)
       this.sacatelefono(env)
        


      })
     


     //this.telefono=val

     //this.user.telefono=this.telefono





}





  logForm(env) {
    console.log(env.email)

  


 let creds = JSON.stringify({ username:env.telefono, email: env.email, password: 'rosa0000',nombre:env.nombre });

console.log(creds)


  let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    });




  this.http.post(this.server.getMyGlobalVar()+'registro_v2/', creds, options)
    .subscribe(
      data => {

        console.log('eroo..',data['_body'])

        if(data['_body']=='"ok"'){

          console.log('ingrese')

           ///Logeandose

                   this.http.post(this.server.getMyGlobalVar()+'api-token-auth/', creds, options)
                  .subscribe(
                    data => {


                       console.log('ingresando..',data)
                       this.storage.set('token', JSON.parse(data["_body"]).token)


                        this.nav.setRoot(HomePage, {statuslogin: true});
                        //this.appCtrl.getRootNav().setRoot(HomePage)
                       //this.view.dismiss()

                       //this.appCtrl.getRootNav().push(UbicacionPage);
                               
                                }
                           
                              );

        }

        if(data['_body']==0){

          //this.emailrepetido()


          this.telefonorepetido()

          //this.toast('Tu numero ya esta registrado. Ingrese solo su numero')
        
          this.http.post(this.server.getMyGlobalVar()+'api-token-auth/', creds, options)
                  .subscribe(
                    data => {


                       this.storage.set('token', JSON.parse(data["_body"]).token)


                       //this.appCtrl.getRootNav().setRoot(HomePage)
                        this.nav.setRoot(HomePage, {statuslogin: true});

                       //this.view.dismiss()
                               
                                }
                           
                              );

        }

     
     
       
      

      }
 
    );





  }

}
