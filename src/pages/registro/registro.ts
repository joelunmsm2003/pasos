import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ToastController } from 'ionic-angular';
import { Http,RequestOptions, Headers } from '@angular/http';
import { App,Nav } from 'ionic-angular';
import { IntroPage } from '../../pages/intro/intro';
import { LoginPage } from '../../pages/login/login';
import { SpinnerProvider } from '../../providers/spinner/spinner'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HistorialsociaPage } from '../../pages/historialsocia/historialsocia';
import { RegistroprincipalPage } from '../../pages/registroprincipal/registroprincipal';
import { HomePage } from '../../pages/home/home';
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
  selector: 'page-registro',
  templateUrl: 'registro.html',
  providers:[ServerProvider]
})
export class RegistroPage {

  private todo : FormGroup;

  registrosociaPage:any;
  loginPage:any;

  isLoggedIn:boolean = false;
  users: any;
  user:any={};
  telefono:any;
  registroprincipalPage:any
  muestraregistro:any=true
  codigo:any;
  codigosms:any;
  valida:any;

  //private userface: SocialUser;

  private loggedIn: boolean;

  
  constructor(public spinner: SpinnerProvider,private nav: NavController,public server:ServerProvider,public toastCtrl: ToastController,private fb: Facebook,public storage: Storage,private _perfil: PerfilProvider,public alertCtrl: AlertController,private view:ViewController,private formBuilder: FormBuilder,public appCtrl: App,private http: Http,public navCtrl: NavController, public navParams: NavParams) {

    //Telefono


     // this.toastingresar()


    this.registroprincipalPage=RegistroprincipalPage

   this.storage.get('telefono').then((val) => {

     this.telefono=val

     this.user.telefono=this.telefono


   })

    ///Facebook

      fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));

    //this.cargandoregistro()



    ///


     this.todo = this.formBuilder.group({
      telefono:[''],

    });

      this.loginPage=LoginPage


  }



   // iralogin(){

   //     //this.navCtrl.push(RegistroprincipalPage, {}, {animate: true, direction: 'forward'});

   //     console.log('v')

   //     //this.nav.push(RegistroprincipalPage)

   //     this.navCtrl.setRoot(RegistroprincipalPage, {}, { animate: true, direction: 'forward' });
   // }
  

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  cargandoregistro() {
    let toast = this.toastCtrl.create({
      message: 'Registrarte con Facebook o por correo',
      duration: 4000
    });
    toast.present();
  }


//Facebook

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

 toastingresar() {
    let toast = this.toastCtrl.create({
      message: 'Inicie sesion con su celular si ya se registro antes',
      position:'top',
      duration: 4000
    });
    toast.present();
  }

 toastregistro() {
    let toast = this.toastCtrl.create({
      message: 'Su numero no esta registrado porfavor registrate',
      position:'top',
      duration: 4000
    });
    toast.present();
  }



   toastcelular() {
    let toast = this.toastCtrl.create({
      message: 'Ingrese su numero de celular',
      position:'bottom',
      duration: 2000
    });
    toast.present();
  }


     toast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      position:'bottom',
      duration: 5000

    });
    toast.present();
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

                      // this.view.dismiss()

                       
                        this.nav.setRoot(HomePage, {statuslogin: true});
                               
                                }
                           
                              );
                           
                              
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

iniciar(data){

  console.log('datos...')


  this.muestraregistro=false

  this.toastcelular()






}


 ingresar(newObj) {
    console.log(newObj)

    

  if(newObj){

     this.spinner.load();

     this.storage.get('codigosms').then((val) => { 

     this.codigosms = val

     this.valida = {'cliente':newObj,'codigosms':this.codigosms}

     //Valida usuario

     this._perfil.validauser(this.valida)
      .subscribe(data => {



          console.log('valida usuario',data)

          if(data=='Ya valido codigo'){

              this.autentifica(newObj,'rosa0000')

              this.spinner.dismiss();

          }

          if(data==0){


                this._perfil.enviasms(newObj)
                .subscribe(data => {


                this.codigo=data.codigo

                this.toast(data.contenido)

                

                console.log('CODID..',data)

                this.sacatelefono(newObj)

                this.spinner.dismiss();
               
              })

          }
          if(data==1){


              console.log('data...')

              this.toast('Su numero no esta registrado porfavor registrate')

              this.spinner.dismiss();


             // this.navCtrl.push(RegistroprincipalPage, {
             //    categoria: data,
             //  })

          }


      },
        error=>{

          console.log(error)

          this.toast(error)

          this.spinner.dismiss();
      })


   })




 


  }
  else{

    this.toast('Ingrese su telefono o registrese')
  }


  

      
}




  sacatelefono(env) {







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
                  text: 'Cancel',
                  role: 'cancel',
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


                      this.autentifica(env,'rosa0000')


                      this.storage.set('codigosms', this.codigo)

                      alert.dismiss()



                    }
                    else{

                      this.toast('Codigo Incorrecto')
                    }

                    return false;
                   
                   
                  }
                }
              ]
            });
            alert.present();



   



  }








  logForm(env) {


    console.log(env.email)



 let creds = JSON.stringify({ username: env.email, password: env.password });




  let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    });


  function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}






  this.http.post(this.server.getMyGlobalVar()+'registro/', env, options)
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

                       this.view.dismiss()

                       //this.appCtrl.getRootNav().push(UbicacionPage);
                               
                                }
                           
                              );

        }

        if(data['_body']==0){

          this.emailrepetido()

        }

     
     
       
      

      }
 
    );





  }

}
