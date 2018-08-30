import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the AvisoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aviso',
  templateUrl: 'aviso.html',
})
export class AvisoPage {

  constructor(public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvisoPage');
  }

  closeModal(){

  this.view.dismiss()
}


}
