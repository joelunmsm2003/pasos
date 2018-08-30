import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { UbicacionPage } from '../ubicacion/ubicacion';
import { ReservaPage } from '../reserva/reserva';

/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
  providers: [CategoriasProvider]
})
export class CarritoPage {


	pedido:any;
	mano :any;
	pies :any;
	maquillaje : any;
	podologia :any;
	masajes : any;
	manicureninas : any;
	baber : any;
	extras : any;
	cabello : any;
	promociones :any;
	indice:any;
  u:any;
  teta:any;
  ubicacion:any;
  precio:any;
  p:any;

  constructor(public dataService: CategoriasProvider,public storage: Storage,private view:ViewController,public navCtrl: NavController, public navParams: NavParams) {


     console.log('navParams', navParams.get('carrito'));

     this.pedido=navParams.get('carrito')

     this.ubicacion=navParams.get('ubicacion')

     this.precio=0

          for(this.p in this.pedido){

          console.log('precio...',this.pedido[this.p].precio)


          this.pedido[this.p].precio_descuento_item=0          

          this.pedido[this.p].precio_descuento_item=Math.round(this.pedido[this.p].precio_descuento*this.pedido[this.p].cantidad*100)/100
 
          this.precio=this.pedido[this.p].precio_descuento*this.pedido[this.p].cantidad+this.precio

          this.precio=Math.round(this.precio*100)/100

          this.storage.set('precio', this.precio)
  
          }




  }

    closeModal(){


    let data = { 'nivel': 'cerrar','pedido':this.pedido };
    

    this.view.dismiss(data)
}





  ionViewDidLoad() {

    console.log('ionViewDidLoad CarritoPage');

         this.precio=0

          for(this.p in this.pedido){

          console.log('precio...',this.pedido[this.p].precio)


          this.pedido[this.p].precio_descuento_item=0          

          this.pedido[this.p].precio_descuento_item=Math.round(this.pedido[this.p].precio_descuento*this.pedido[this.p].cantidad*100)/100
 
 
          this.precio=this.pedido[this.p].precio_descuento*this.pedido[this.p].cantidad+this.precio

          this.precio=Math.round(this.precio*100)/100

          //this.precio=this.precio.toFixed(2)

          this.storage.set('precio', this.precio)
  
          }




  }

    ionViewWillEnter() {
   


     }


    continuar(){


   let data = { 'nivel': 'ubicacion' };
      this.view.dismiss(data)
   
      // if(this.pedido){

      //    this.navCtrl.push(UbicacionPage, {})
      // }
      // else{

      //     this.navCtrl.push(ReservaPage, {})

      // }

       

    }




quitacarrito(data){



     this.u=this.pedido.filter(c => c.id === data.id)

      console.log('quitando',this.u)

      const index: number = this.pedido.indexOf(data);

      if (index !== -1) {

          this.pedido.splice(index, 1)

          console.log('holaaa.',this.pedido)

          this.storage.set('pedido', this.pedido)

          this.precio=0

          for(this.p in this.pedido){



          this.pedido[this.p].precio_descuento_item=0          

          this.pedido[this.p].precio_descuento_item=Math.round(this.pedido[this.p].precio_descuento*this.pedido[this.p].cantidad*100)/100
 

          console.log('precio...',this.pedido[this.p].precio_descuento)
 
          this.precio=this.pedido[this.p].precio_descuento*this.pedido[this.p].cantidad+this.precio

         this.precio=Math.round(this.precio*100)/100

          //this.precio=this.precio.toFixed(2)

           this.storage.set('precio', this.precio)
  
          }



          
      }  


     


      

      // if (this.u.length==1){
       
      // this.book=this.book-1

      // this.precio = this.precio-data.precio

      // console.log('pedido',this.pedido)
      // }

  }




}
