import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,Nav, LoadingController,AlertController,ModalController } from 'ionic-angular';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { HomePage } from '../home/home';

import { SpinnerProvider } from '../../providers/spinner/spinner'
import { Device } from '@ionic-native/device';
import { ServerProvider } from '../../providers/server/server';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DetalleservicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalleservicio',
  templateUrl: 'detalleservicio.html',
  providers:[ServerProvider]
})
export class DetalleservicioPage {

  @ViewChild(Nav) nav: Nav;
	socia__photo:any;
	ped:any;
	fecha:any;
	fecha_inicio:any;
	serv:any;
	estado:any;

	host:any;
	codigo_servicio:any;
	socia:any;
	referencia:any;
	socia_photo:any;
	precio:any;
	nombre:any;
	todoser:any;
	ser:any;
	preciototal:any=0;
  precio_promo:any;



  constructor(public modalCtrl: ModalController,public alertCtrl: AlertController,private storage: Storage,public loadingCtrl: LoadingController,public server:ServerProvider,public device:Device,public spinner: SpinnerProvider,public toastCtrl: ToastController,public _servicio:ServiciosProvider,public navCtrl: NavController, public navParams: NavParams) {

  	this.serv = navParams.get("servicio");

  	this.host=this.server.getMyGlobalVar()


  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Perfecto nuestra socia vendra hacia ti atenderte',
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




  ionViewDidLoad() {



	this._servicio.detalleservicio(this.navParams.get("servicio"))
		.subscribe(data => {


		console.log('servicos....',data)

		this.ped=data[0]['pedidos']

		 for(this.ser in this.ped){


        console.log('que.....',this.ped[this.ser])
        this.todoser = this.ped[this.ser].subcategoria__nombre+ ' S/. '+this.ped[this.ser].subcategoria__precio+'<br>'+this.todoser 

        this.preciototal=this.ped[this.ser].subcategoria__precio+this.preciototal

      }

		this.codigo_servicio=data[0]['id']

		this.precio=this.preciototal

    this.precio=this.precio.toFixed(2)

		this.fecha=data[0]['fecha']

		this.fecha_inicio=data[0]['fecha_inicio']

		this.nombre=data[0]['cliente__nombre']


		this.estado=data[0]['estado__nombre'];

		this.socia=data[0]['socia__nombre']

		this.referencia=data[0]['referencia']

		this.socia__photo=data[0]['socia__photo']

    this.precio_promo=data[0]['precio_promo']


		console.log('jsjsj',this.socia__photo)

		}


		);



    
  }

  aceptar(servicio){


     this.spinner.load();

	 this._servicio.detalleservicio(this.navParams.get("servicio"))
		.subscribe(data => {

		this._servicio.aceptaservicio(data[0]['id'])

		.subscribe(data => {



				this._servicio.detalleservicio(this.navParams.get("servicio"))
				.subscribe(data => {



				this.estado=data[0]['estado__nombre'];



				this.spinner.dismiss();

				this.presentToast()



				})






		}



		);


		});
  }

  pagar(){


  	this.navCtrl.popToRoot();

  	window.open('https://mylookxpress.com/culqui.php?precio='+this.precio+'&codigo='+this.codigo_servicio+'&nombre='+this.nombre+'&pedidos='+this.todoser)

  }


  confirmapago(){


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

                      //this.pagarefectivoToast() 

                      this.pagarenefectivo()


                  }
                }
              ]
            });
            alert.present();




  }



   pagarenefectivo(){

      let loader = this.loadingCtrl.create({
    content: 'Estamos procesando tu pedido.',
  });


     this.spinner.load();

     loader.present().then(() => {



    this._servicio.pagarenefectivo(this.navParams.get("servicio"))

    .subscribe(data => {

          this._servicio.detalleservicio(this.navParams.get("servicio"))
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

    cancelar(servicio){


     this.spinner.load();

	 this._servicio.detalleservicio(this.navParams.get("servicio"))
		.subscribe(data => {

		this._servicio.cancelarservicio(data[0]['id'])

		.subscribe(data => {



				this._servicio.detalleservicio(this.navParams.get("servicio"))
				.subscribe(data => {



				this.estado=data[0]['estado__nombre'];



				this.spinner.dismiss();

				//this.presentToast()



				})






		}



		);


		});
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



// detalleModal(data) {


//   console.log('djdjdj',data)

// //this.navCtrl.push(DetalleproductoPage, {producto:data})


//    let profileModal = this.modalCtrl.create(DetalleproductoPage, { producto:data});
//    profileModal.onDidDismiss(data => {
     


// //        this.agregacarrito(data.producto)

      


//    });
//    profileModal.present();



//  }






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



    this._servicio.pagoyape(this.navParams.get("servicio"))

    .subscribe(data => {

          this.refresca(this.navParams.get("servicio"))


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

      this._servicio.pagotulki(this.navParams.get("servicio"))

      .subscribe(data => {


        this.refresca(this.navParams.get("servicio"))


      })


      setTimeout(() => {
      loader.dismiss();
      }, 3000);


      });

    }

}
