import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiciosProvider } from '../../providers/servicios/servicios';

import { AlertaPage } from '../../pages/alerta/alerta';


/**
 * Generated class for the HistorialsociaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historialsocia',
  templateUrl: 'historialsocia.html',
  providers: [ServiciosProvider]
})
export class HistorialsociaPage {

  servicios:any;

  constructor(public _servicio:ServiciosProvider,public navCtrl: NavController, public navParams: NavParams) {


  	


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialsociaPage');

    

    this._servicio.serviciosdesocias()
      .subscribe(data => this.servicios=data);

  }

   iradetalle(data){

    this.navCtrl.push(AlertaPage, {
      servicio: data.id,
    })

  }

}
