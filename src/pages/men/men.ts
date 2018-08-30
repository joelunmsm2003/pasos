import { Component,ViewChild,NgZone } from '@angular/core';
import { App,Nav,ModalController,IonicPage, NavController, NavParams,Platform,AlertController,ToastController } from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { Categoria } from '../../providers/categorias/categoria';
import { Http,RequestOptions, Headers } from '@angular/http';
import { PortadaProvider } from '../../providers/portada/portada';
import { Storage } from '@ionic/storage';

import { VentaPage } from '../venta/venta';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { UbicacionPage } from '../../pages/ubicacion/ubicacion';
import { PerfilPage } from '../perfil/perfil';
import { LoginPage } from '../login/login';
import { ServicioPage } from '../../pages/servicio/servicio';
import { HistorialPage } from '../historial/historial';
import { CarritoPage } from '../carrito/carrito';
import { HistorialsociaPage } from '../historialsocia/historialsocia';
import { RegistroPage } from '../../pages/registro/registro';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AyudaPage } from '../ayuda/ayuda';
import { LoginprincipalPage } from '../loginprincipal/loginprincipal';
import { NotificacionPage } from '../notificacion/notificacion';

import { Slides } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the MenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-men',
  templateUrl: 'men.html',
  providers: [CategoriasProvider,PortadaProvider,ServerProvider]
})
export class MenPage {






@ViewChild(Nav) nav: Nav;


categoria: Categoria[];



@ViewChild(Slides) slides: Slides;


reservaPage: any;

introPage: any;

perfilPage: any;

servicioPage:any;

ventaPage:any;


historialPage:any;
ayudaPage:any;


loginPage:any;

registroPage:any;

logeado:any;

nologeado:any;

user_grupo:any;

loginprincipalPage:any;

pages: Array<{title: string, component: any}>;

photo1: string;

photo2: string;

photo3: string;


photo4: string;

photo5: string;

photo6: string;

photo7: string;
photo8: string;

link1:string;
link2:string;
link3:string;
link4:string;
link5:string;
link6:string;
link7:string;
link8:string;
map: any;
sexo:any;
address = '';

ubicacion:any;
referencia:any;
host:any;
book:any;
pedido:any;

constructor(public server :ServerProvider,public appCtrl: App,public toastCtrl: ToastController,private _photo: PortadaProvider,private alertCtrl: AlertController,private http: Http,public zone: NgZone,public platform: Platform,public modalCtrl: ModalController,private socialSharing: SocialSharing,private storage: Storage,private _perfil: PerfilProvider,private _categoria: CategoriasProvider,public navCtrl: NavController, public navParams: NavParams) {




       this.storage.get('sexo').then((val) => {


           if(val==null){

             
                
               this.sacasexo1()
                    

           }

      });

    this.primerencuentro()

    this.host=this.server.getMyGlobalVar()


    

    //alert(this.device.uuid);



    this.perfilPage = PerfilPage;

    this.servicioPage = ServicioPage;

    this.historialPage = HistorialPage;

    this.loginPage = LoginPage;

    this.loginprincipalPage = LoginprincipalPage;

    this.ventaPage=VentaPage;

    this.ayudaPage=AyudaPage;



     ///Por default

      this._categoria.getcategorias(2)
            .subscribe(data => this.categoria = data);


                          this._photo.getfotosdeportada(2)
              
      .subscribe(data => {

           this.photo1=data[0].photo;

           this.link1=data[0].enlace

           this.photo2=data[1].photo;

           this.link2=data[1].enlace

           this.photo3=data[2].photo

           this.link3=data[2].enlace

           this.photo4=data[3].photo

           this.link4=data[3].enlace



      })


              this._photo.getfotosdepublicidad()
      .subscribe(data => {

           this.photo5=data[0].photo

           this.link5=data[0].enlace

           this.photo6=data[1].photo

           this.link6=data[1].enlace

           this.photo7=data[2].photo

           this.link7=data[2].enlace

           this.photo8=data[3].photo

           this.link8=data[3].enlace
      })



  /////


  }



  sacadistrito(){


   


    let alert1 = this.alertCtrl.create();
    alert1.setTitle('Cual es tu distrito?');

     alert1.addInput({
                type: 'radio',
                label: 'Lima',
                value: '1',
                checked: false
                });

  this.http.get(this.server.getMyGlobalVar()+'distrito/').subscribe(data => {
        
     
        for (let entry of JSON.parse(data['_body'])) {
                  
                console.log(entry['nombre'])


                alert1.addInput({
                type: 'radio',
                label: entry['nombre'],
                value: entry['id'],
                checked: false
                });


        }

    });

      



    alert1.addButton('Cancel');
    alert1.addButton({
      text: 'OK',
      handler: data => {

        this.storage.set('distrito',data)

        console.log(data)

        this.primerencuentro()

        // this.testRadioOpen = false;
        // this.testRadioResult = data;
      }
    });
    alert1.present();
  
  }


 


 carritoModal() {

  let profileModal = this.modalCtrl.create(CarritoPage, { carrito:this.pedido});
   profileModal.onDidDismiss(data => {
     
       if(data.nivel=='ubicacion'){
          
          
       this.navCtrl.push(UbicacionPage, {})
         
       }

       this.book=data.pedido.length

   });
   profileModal.present();

 }




 

  sacasexo1(){

  let alertsexo = this.alertCtrl.create({
    title: 'Escoge tu genero',
    cssClass: 'sexocss',
    buttons: [
      {
        text: '',
        role: 'cancel',
        handler: () => {
          this.storage.set('sexo',1)
          this.sexo=1
          this.sacacategoria(1)
        }
      },
      {
        text: '',
        handler: () => {
          this.storage.set('sexo',2)
          this.sacacategoria(2)
        }
      }
    ]
  });






  alertsexo.present();





  }





  sacacategoria(sexo){



        this.navCtrl.popToRoot();




      //     this._categoria.getcategorias(sexo)
      //       .subscribe(data => this.categoria = data);


      //                     this._photo.getfotosdeportada(sexo)
              
      // .subscribe(data => {

      //      this.photo1=data[0].photo;

      //      this.link1=data[0].enlace

      //      this.photo2=data[1].photo;

      //      this.link2=data[1].enlace

      //      this.photo3=data[2].photo

      //      this.link3=data[2].enlace

      //      this.photo4=data[3].photo

      //      this.link4=data[3].enlace



      // })


      //         this._photo.getfotosdepublicidad()
      // .subscribe(data => {

      //      this.photo5=data[0].photo

      //      this.link5=data[0].enlace

      //      this.photo6=data[1].photo

      //      this.link6=data[1].enlace

      //      this.photo7=data[2].photo

      //      this.link7=data[2].enlace

      //      this.photo8=data[3].photo

      //      this.link8=data[3].enlace
      // })

  }


   primerencuentro() {
    let toast = this.toastCtrl.create({
      message: 'Escoge uno de nuestros servicios a delivery que disponemos para ti',
      position:'bottom',
      duration: 5000
    });
    toast.present();
  }


 loginModal() {
   let profileModal = this.modalCtrl.create(LoginprincipalPage);
   profileModal.present();
 }


  ionViewDidLoad() {

    console.log('ionViewDidLoad','Intro')
     //this.currentLocation()
  
  }

    ionViewWillLoad() {

    console.log('ionViewWillLoad','Intro')

  
  }

 ionViewWillEnter(){

      console.log('ionViewWillEnter','Intro')

            this.storage.get('pedido').then((val) => {

              if(val){

                        this.pedido=val

                        this.book=this.pedido.length

                        console.log('entre a book')

              }

    

    });


      this.storage.get('token').then((val) => {

           if(val){

                this.logeado=true

           }

      });

  }



  ionViewDidEnter(){

      console.log('ionViewDidEnter','Intro')

      this.storage.get('token').then((val) => {


           if(val){

             
                this.logeado=true

                    

           }

      });





  }

  iraventas(data){

 
   this.navCtrl.push(VentaPage, {
      categoria: data,
    })


    



}

 gonoti(){

this.navCtrl.push(NotificacionPage, {
      user: 'data',
    })


 }



    shareSheetShare() {
    this.socialSharing.share("Registrate", "Atreveteeetee sal del closeet", "https://st2.depositphotos.com/5328332/12205/v/950/depositphotos_122057578-stock-illustration-express-delivery-of-fashion-and.jpg", "https://play.google.com/store/apps/details?id=io.codigito.mylookexpress&hl=es").then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }



  ///Saca ubicacion



  // currentLocation() {

  //   this.geolocation.getCurrentPosition().then((position) => {
  //     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //     let latLngObj = {'lat': position.coords.latitude, 'long': position.coords.longitude};
  //     // Display  Marker
  //     //this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  //     //alert(latLngObj)
  //     //this.storage.set('ubicacion', latLngObj)

  //     this.ubicacion=latLngObj

  //     this.getAddress(latLngObj);

  //     localStorage.setItem('current_latlong', JSON.stringify(latLngObj));
  //     return latLngObj;

  //   }, (err) => {
  //     console.log(err);
  //   });
  // }



  // getAddress(latLngObj) {
  //   // Get the address object based on latLngObj
  //   this.mapService.getStreetAddress(latLngObj).subscribe(
  //     s_address => {
  //       if (s_address.status == "ZERO_RESULTS") {
  //         this.mapService.getAddress(latLngObj).subscribe(
  //           address => {
  //             this.address = address.results[0].formatted_address;
  //             //this.getAddressComponentByPlace(address.results[0], latLngObj);
  //           },
  //           err => console.log("Error in getting the street address " + err)
  //         )
  //       } else {


  //         console.log('ingrese.....',s_address)
          
  //         this.address = s_address.results[0].formatted_address;

  //         this.sacaactualdistrito(this.address)
          

  //         this.referencia = s_address.results[0].formatted_address;



  //         //this.getAddressComponentByPlace(s_address.results[0], latLngObj);
  //         //alert(latLngObj)
  //         //this.storage.set('ubicacion', latLngObj)
  //         //alert(this.address);
  //       }
  //     },
  //     err => {
  //       //alert('No Address found ' + err);
  //     }
  //   );
  // }


  sacaactualdistrito(ubicacion) {


  let creds = JSON.stringify({ ubicacion: ubicacion});



  let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    });


  this.http.post(this.server.getMyGlobalVar()+'obtienedistrito/', creds, options)
    .subscribe(
      data => {



        this.storage.set('distrito',data['_body'])


      })


}



}
