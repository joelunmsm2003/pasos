import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { SociasPage } from '../socias/socias';

/**
 * Generated class for the DetalleproductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalleproducto',
  templateUrl: 'detalleproducto.html',
})
export class DetalleproductoPage {


	producto:any;
	host:any;
	numero:any;
  ahora:any;
  socia_detalle:any;
  s:any;
  array:any;



  constructor(public modalCtrl: ModalController,public server:ServerProvider,public navCtrl: NavController, public navParams: NavParams,private view:ViewController) {




     this.host=this.server.getMyGlobalVar()


      this.array = [1,2,3,4,5];


     console.log('server..',this.host)

     console.log('navParams', navParams.get('producto'));

      this.numero=1

     this.producto=navParams.get('producto')





     console.log('ennnnn',this.producto)

     this.socia_detalle = this.producto.socias[0]

     if (this.producto.escogido){



          this.socia_detalle=this.producto.escogido


     }
     else{


           this.producto.escogido = this.producto.socias[0]

     }


     this.ahora=(this.producto.precio_descuento).toFixed(2)

     //this.producto.precio = (100-this.producto.descuento)*this.producto.precio/100

     console.log('hdhdhdh',this.producto.descuento,this.producto.precio)

     //this.producto.precio_descuento = (100+this.producto.descuento)*this.producto.precio*0.01;
    




  }



generaestrellas(data){

this.array=[]

for (var _i = 0; _i < data; _i++) {

    this.array.push('*')

}



}

escogersocia(data){

  console.log(data)


  //this.socia_detalle = data

 

  // for (this.s in this.producto.socias){

  //   console.log('nsnnss',this.producto.socias[this.s])

  //   this.producto.socias[this.s].escogido=false
  // }


  //  data.escogido=true


  //  this.producto.escogido=data


  // console.log('producto',this.producto)

   let profileModal = this.modalCtrl.create(SociasPage, {_socia_detalle:data });
   profileModal.present();




  
}





  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleproductoPage');
  }



asignar(producto,numero){

	this.producto.cantidad=numero
	
	this.producto.check=true

  //this.producto.precio_descuento = (100+this.producto.descuento)*this.producto.precio*0.01;
    


	this.closeModal(this.producto)
}


actualizaprecio(data){

  console.log(data)

  
  this.ahora=(data*this.producto.precio_descuento).toFixed(2)

}


closeModal(data){


    let datax = { 'producto': data };
    

    this.view.dismiss(datax)


}



}
