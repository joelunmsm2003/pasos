import { Component } from '@angular/core';
import { ModalController,App,IonicPage, NavController, NavParams,ToastController,LoadingController,AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { RegistroPage } from '../registro/registro';
import { CarritoPage } from '../carrito/carrito';
import { PagoPage } from '../pago/pago';

import { DetalleproductoPage } from '../detalleproducto/detalleproducto';
import { SociasPage } from '../socias/socias';
import { Storage } from '@ionic/storage';
import { AuthHttp, tokenNotExpired,JwtHelper } from 'angular2-jwt';
import { ServicioPage } from '../servicio/servicio';
import { SpinnerProvider } from '../../providers/spinner/spinner'
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { PerfilProvider } from '../../providers/perfil/perfil';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
import { ServerProvider } from '../../providers/server/server';


/**
 * Generated class for the ReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html',
  providers:[ServerProvider]
})
export class ReservaPage {


  


	public rootPage: any = HomePage;

  ubicacion :any;
  pedidos:any;
  precio:any;
  dia:any;
  hora:any;
  data:any;
  referencia:any;
  socia:any;
  id_servicio:any;
  photo_socia:any;
  telefono:any;
  estado:any;
  codigo_servicio:any;
  nombre: any;
   email: any;
   i:any;
   todoservicio:any='';
   ser:any;
   todoser:any='';
   task:any;
   cliente:any={};
   pedido:any;
   book:any;
   tipo:any;
   datolugar:any;
   p:any;
   precio_promo:any=null;
   hora_1:any;
   _socia_detalle:any;
   s:any;
   host:any;



  constructor(public alertCtrl: AlertController,public server:ServerProvider,private _perfil: PerfilProvider,public loadingCtrl: LoadingController,public _servicio:ServiciosProvider,public toastCtrl: ToastController,public spinner: SpinnerProvider,public modalCtrl: ModalController,public appCtrl: App,private authHttp: AuthHttp,private storage: Storage,public http: Http,public navCtrl: NavController, public navParams: NavParams,private googleMaps: GoogleMaps) {


  this.host=this.server.getMyGlobalVar()


this.storage.get('pedido').then((val) => {



      console.log('entre a pedidos.............',val)


      this.pedidos=val

     


      for (this.i = 0; this.i < this.pedidos.length; this.i++) { 

     

        this.todoservicio=this.todoservicio+' * '+this.pedidos[this.i].nombre

        this.pedidos[this.i].precio_descuento_item=Math.round(this.pedidos[this.i].precio_descuento*this.pedidos[this.i].cantidad*100)/100



      }

  });







      this._perfil.miperfil()
      .subscribe(data => {


        

          this.email=data[0]['email']
          this.telefono=data[0]['telefono']
          
          this.nombre=data[0]['nombre']


          console.log('this.telefono=',data)


      })




    function toDate(dStr,format) {
      var now = new Date();
      if (format == "h:m") {
         now.setHours(dStr.substr(0,dStr.indexOf(":")));
         now.setMinutes(dStr.substr(dStr.indexOf(":")+1));
         now.setSeconds(0);
         return now;
      }else 
        return "Invalid Format";
    }

    function format_time(date_obj) {
  // formats a javascript Date object into a 12h AM/PM time string
  var hour = date_obj.getHours();
  var minute = date_obj.getMinutes();
  var amPM = (hour > 11) ? " pm" : " am";
  if(hour > 12) {
    hour -= 12;
  } else if(hour == 0) {
    hour = "12";
  }
  if(minute < 10) {
    minute = "0" + minute;
  }
  return hour + ":" + minute + amPM;
}








    this.agregatoast()



      this.storage.get('ubicacion').then((val) => {

        this.ubicacion=val
  });


         this.storage.get('precio').then((val) => {

        this.precio=val

        this.precio=Math.round(this.precio*100)/100

        this.precio=this.precio.toFixed(2)
  });

        this.storage.get('dia').then((val) => {

        this.dia=val
  });

          this.storage.get('hora').then((val) => {

      

        this.hora=val

        this.hora_1=format_time(toDate(this.hora,"h:m"));


       
  });


      this.storage.get('referencia').then((val) => {

 

        this.referencia=val
  });

      this.storage.get('tipo').then((val) => {

 

        this.tipo=val
  });

            this.storage.get('datolugar').then((val) => {

 

        this.datolugar=val
  });



      
     this.spinner.load();





     this.storage.get('token').then((val) => {



      if(val==null){

 

        this.presentProfileModal()

       this.spinner.dismiss();


      }
      else{



                  let myHeader = new Headers();
                  myHeader.append('Content-Type', 'application/json');

                  this.data={

                  'pedido':this.pedidos,
                  'ubicacion':this.ubicacion,
                  'dia':this.dia,
                  'hora':this.hora,
                  'referencia':this.referencia,
                  'tipo':this.tipo,
                  'datolugar':this.datolugar

                  }

                  this.authHttp.post(this.server.getMyGlobalVar()+'buscasocia/1', this.data)
                  .subscribe(
                  data => {


                  this._socia_detalle = JSON.parse(data['_body'])[0]


                  this.id_servicio = JSON.parse(data['_body'])[0]['servicio_id']

                  this.socia = JSON.parse(data['_body'])[0]['servicio__socia__nombre']

                  this.photo_socia = JSON.parse(data['_body'])[0]['servicio__socia__photo']

                  this.telefono = JSON.parse(data['_body'])[0]['servicio__socia__telefono']

                  this.codigo_servicio = JSON.parse(data['_body'])[0]['servicio_id']

                  this.estado='Pendiente'

                  //sthis.appCtrl.getRootNav().push(ServicioPage);

                  this.spinner.dismiss();



                  }

                  );




      }

  });


  }


  ionViewWillEnter(){

    this.storage.get('pedido').then((val) => {

      this.pedido=val



      this.book=this.pedido.length

      if(this.book==0){

        this.navCtrl.popToRoot();
      }

    });

  }


  ionViewDidLoad() {


     this._perfil.miperfil()
      .subscribe(data => {


          this.email=data[0]['email']

          this.telefono=data[0]['telefono']
          
          this.nombre=data[0]['nombre']

      })
   



  }




alertaPago(data) {


let alert = this.alertCtrl.create({
    title: '¿Como desea pagar?',
    cssClass: 'alertDanger', 
    buttons: [
      {
        text: 'Pago en Efectivo',
               
        handler: () => {
          console.log('Cancel clicked');
          this.confirmapago()
        }
      },
      {
        text: 'Pago con Tarjeta',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
       {
       
        cssClass: 'tunki',
        handler: () => {
          console.log('Cancel clicked');
          this.pagotulki()
        }
      },
      {
        
        cssClass: 'yape',
        handler: () => {
          console.log('Buy clicked');
          this.pagotarjetaToast()
        }
      }
    ]
  });
  alert.present();


 }



detalleModal(data) {


  console.log('djdjdj',data)

//this.navCtrl.push(DetalleproductoPage, {producto:data})


   let profileModal = this.modalCtrl.create(DetalleproductoPage, { producto:data});
   profileModal.onDidDismiss(data => {
     


//        this.agregacarrito(data.producto)

      


   });
   profileModal.present();



 }


    agregatoast() {
    let toast = this.toastCtrl.create({
      message: 'Estamos a un paso, de completar tu pedido !',
      duration: 4000
    });
    toast.present();
  }


      toastgenerico(data) {

    let toast = this.toastCtrl.create({
      message: data,
      duration: 4000
    });
    toast.present();
  }


  agregapromo(promo,codigo_servicio){


    console.log('promo',promo)

    if(promo){


    this.spinner.load();

     this._servicio.promo(promo,this.id_servicio)

    .subscribe(data => {

        console.log(data)

        this.toastgenerico(data)


        this.spinner.dismiss();

            this._servicio.detalleservicio(this.id_servicio)
             .subscribe(data => {


                 console.log('data...',data)

                 this.precio_promo=data[0]['precio_promo']



             

           })

       })


    }
    else{


      this.toastgenerico('Ingrese codigo promocional para que recibas un descuento')
    }



  }




 presentProfileModal() {
   let profileModal = this.modalCtrl.create(RegistroPage, { userId: 8675309 });
   profileModal.present();
 }


 sociasModal(pedido,_socia_detalle) {
   let profileModal = this.modalCtrl.create(SociasPage, { pedido: pedido,_socia_detalle:_socia_detalle });
   profileModal.present();
 }




   carritoModal() {


 
   let profileModal = this.modalCtrl.create(CarritoPage, { carrito:this.pedido});
   profileModal.onDidDismiss(data => {
     
 
       this.pedidos=data.pedido

       if(this.book.pedido){

           this.book=data.pedido.length


       }

       

          this.precio=0

          for(this.p in this.pedidos){

          console.log('precio...',this.pedido[this.p].precio)
 
          this.precio=this.pedidos[this.p].precio_descuento*this.pedidos[this.p].cantidad+this.precio

          this.precio=Math.round(this.precio*100)/100


          this.pedidos[this.p].precio_descuento_item=Math.round(this.pedidos[this.p].precio_descuento*this.pedidos[this.p].cantidad*100)/100

          
           this.storage.set('precio', this.precio)
  
           }

        if(this.book==0){

          console.log('rooott...')

        this.navCtrl.popToRoot();
      }

   });
   profileModal.present();

 }



 pagar(){


   //this.presentProfileModal()



  //this.navCtrl.popToRoot();

   //window.open('https://mylookxpress.com/culqui.php?precio='+this.precio+'&codigo='+this.codigo_servicio+'&nombre='+this.nombre+'&pedidos='+this.todoser)


 }







  quitacarrito(data){



      const index: number = this.pedidos.indexOf(data);

      if (index !== -1) {



          this.precio=this.precio-this.pedidos[index].precio

          this.precio=Math.round(this.precio*100)/100

          
          this.pedidos.splice(index, 1);
      }  


  }


   presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Excelente ! hemos completado tu solicitud, en breve te contactaremos con nuestra socia',
      duration: 4000
    });
    toast.present();
  }

   pagotarjetaToast() {
    let toast = this.toastCtrl.create({
      message: 'Esta opcion se habilitara dentro de 1 semana',
      duration: 4000
    });
    toast.present();
  }



  pagoenefectivoToast() {
    let toast = this.toastCtrl.create({
      message: 'Esta opcion se habilitara dentro de 1 semana',
      duration: 4000
    });
    toast.present();
  }



pagarefectivoToast() {
    let toast = this.toastCtrl.create({
      message: 'Actualizamos para el pago en efectivo, Gracias',
      duration: 4000
    });
    toast.present();
  }


  confirmapago_v2(){


            let alert = this.alertCtrl.create({
              title: 'Gracias por tu preferencia, en breve nuestro personal se pondra en contacto con usted',
              
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: data => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Confirmar',
                  handler: data => {
                   
                     //this.actualiza(this.nombre,this.email,data.telefono)

                      this.pagarefectivoToast() 

                      this.pagarenefectivo()

                      this.storage.remove('pedido')


                  }
                }
              ]
            });
            alert.present();




  }


    confirmapago(){

   

     // this.pagarefectivoToast() 

     //this.presentLoadingDefault()

      this.pagarenefectivo()

      this.storage.remove('pedido')



    }




 

  sacatelefono() {


    console.log('sacatelefono...',this.telefono,'8888')




    if (this.telefono==null || this.telefono==''){

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
    else{

        this.aceptar()

    }

   



  }



    actualiza(nombre,email,telefono){
 

    this.cliente.nombre=nombre
    this.cliente.email=email
    this.cliente.telefono=telefono


    this._perfil.actualiza(this.cliente)
      .subscribe(data => {

        this.aceptar()


      })

  }









    aceptar(){

      let loader = this.loadingCtrl.create({
    content: 'Estamos procesando tu pedido.',
  });


     this.spinner.load();

     loader.present().then(() => {



    this._servicio.aceptaservicio(this.id_servicio)

    .subscribe(data => {

          this._servicio.detalleservicio(this.id_servicio)
         .subscribe(data => {
         this.estado=data[0]['estado__nombre'];

         console.log('estado',this.estado)

       })

        this.navCtrl.popToRoot();


        this.storage.set('newservice', 1)


        this.spinner.dismiss();

         this.presentToast()




        })


    loader.dismiss();


      });

    }


     iralmenu(){

    this.navCtrl.popToRoot();

    
  }


  presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Gracias por su preferencia, Estamos procesando tu pedido.',
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 5000);
}



    pagarenefectivo(){

      let loader = this.loadingCtrl.create({
    content: 'Gracias por su preferencia, Estamos procesando tu pedido.',
    duration:50000
  });


     //this.spinner.load();

     loader.present().then(() => {



    this._servicio.pagarenefectivo(this.id_servicio)

    .subscribe(data => {


      this.refresca(this.id_servicio)

      this.storage.remove('pedido')


        })


    setTimeout(() => {
    loader.dismiss();
  }, 3000);


      });

    }


    pagotulki(){

      let loader = this.loadingCtrl.create({
      content: 'Pago Tulki. No te olvides enviarnos tu constancia de pago por Whatsapp.',
      duration:50000
      });

      loader.present().then(() => {

      this._servicio.pagotulki(this.id_servicio)

      .subscribe(data => {


        this.refresca(this.id_servicio)

        this.storage.remove('pedido')


      })


      setTimeout(() => {
      loader.dismiss();
      }, 3000);


      });

    }


    refresca(id_servicio){

        this._servicio.detalleservicio(id_servicio).subscribe(data => { this.estado=data[0]['estado__nombre']; })

        this.navCtrl.popToRoot();

        this.storage.set('newservice', 1)

        this.presentToast()

    }



    pagoyape(){

      let loader = this.loadingCtrl.create({
    content: 'Pago Yape',
    duration:50000
  });


     //this.spinner.load();

     loader.present().then(() => {



    this._servicio.pagoyape(this.id_servicio)

    .subscribe(data => {

          this.refresca(this.id_servicio)

                this.storage.remove('pedido')


        })


    setTimeout(() => {
    loader.dismiss();
  }, 3000);


      });

    }


  //  confirma() {


  //    this.spinner.load();




  //    this.storage.get('token').then((val) => {

  //     console.log('token',val)

  //     if(val==null){

  //       console.log('nullll')

  //       this.presentProfileModal()

  //      this.spinner.dismiss();


  //     }
  //     else{


  //                 this.presentToast()

  //                 let myHeader = new Headers();
  //                 myHeader.append('Content-Type', 'application/json');

  //                 this.data={

  //                 'pedido':this.pedidos,
  //                 'ubicacion':this.ubicacion,
  //                 'dia':this.dia,
  //                 'hora':this.hora,
  //                 'referencia':this.referencia

  //                 }

  //                 this.authHttp.post(this.API_URL+'/buscasocia/1', this.data)
  //                 .subscribe(
  //                 data => {

  //                 console.log('resultados de busqueda..',data)

  //                 //sthis.appCtrl.getRootNav().push(ServicioPage);

  //                 this.spinner.dismiss();



  //                 }

  //                 );




  //     }

  // });

  // }



}

	


