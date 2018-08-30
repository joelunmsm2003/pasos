import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Categoria } from '../../providers/categorias/categoria';
import { DetalleproductoPage } from '../detalleproducto/detalleproducto';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

	subcategorias:any;
	categoriaList:any;
	_subcategorias:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {


  	this.subcategorias=navParams.get('data')

  	this._subcategorias=navParams.get('data')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

    detalleModal(data) {


  console.log('djdjdj',data)


  //this.navCtrl.push(DetalleproductoPage, {producto:data})
  
   this.navCtrl.push(DetalleproductoPage, {
      producto: data,
    })




   // let profileModal = this.modalCtrl.create(DetalleproductoPage, { producto:data});
   // profileModal.onDidDismiss(data => {
     


   //      this.agregacarrito(data.producto)

      


   // });
   // profileModal.present();



 }



    buscador(data){



      console.log(data)

      this.categoriaList = this.subcategorias.filter((book: Categoria) => {

        
      return book.nombre.toLowerCase().indexOf(
     data.toLowerCase()) > -1;   




});





     this._subcategorias = this.categoriaList


    }



}
