import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { DetalleservicioPage } from '../../pages/detalleservicio/detalleservicio';
import { ServerProvider } from '../../providers/server/server';
import { SpinnerProvider } from '../../providers/spinner/spinner'

/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
  providers:[ServerProvider]

})
export class HistorialPage {

	servicios:any;

	host:any;

  constructor(public alertCtrl: AlertController,public spinner: SpinnerProvider,public server:ServerProvider,public _servicio:ServiciosProvider,public navCtrl: NavController, public navParams: NavParams) {

  this.host=this.server.getMyGlobalVar()






  this._servicio.getservicios()
      .subscribe(data => this.servicios=data);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }

  iradetalle(data){

    this.navCtrl.push(DetalleservicioPage, {
      servicio: data.id,
    })

  }

  elimina(data){


    this.spinner.load();

    console.log(data)


  this._servicio.eliminaservicio(data.id)
      .subscribe(data => {





      this._servicio.getservicios()
      .subscribe(data => {


        this.servicios=data

        this.spinner.dismiss();


      });

      });


  }

    confirmaeliminacion(servicio){


            let alert = this.alertCtrl.create({
              title: 'Esta seguro que desea eliminar esta reserva',
              
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

                     this.elimina(servicio)


                  }
                }
              ]
            });
            alert.present();




  }


}
