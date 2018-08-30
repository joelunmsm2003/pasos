import { Component,ViewChild } from '@angular/core';
import { App,IonicPage, NavController, NavParams,Tabs,AlertController, ToastController,ModalController,MenuController,ViewController } from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { Categoria } from '../../providers/categorias/categoria';
import { Subcategoria } from '../../providers/categorias/subcategoria';
import { Http,RequestOptions, Headers } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ReservaPage } from '../reserva/reserva';
import { CarritoPage } from '../carrito/carrito';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { UbicacionPage } from '../ubicacion/ubicacion';
import { DetalleproductoPage } from '../detalleproducto/detalleproducto';
import { IntroPage } from '../intro/intro';
import { PerfilPage } from '../perfil/perfil';
import { Storage } from '@ionic/storage';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the VentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-venta',
  templateUrl: 'venta.html',
  providers: [CategoriasProvider,ServerProvider]
})
export class VentaPage {

categoria: Categoria[];


myVar=true

header:any

subcategoria: Subcategoria[];

venta: Subcategoria[];

mano: Subcategoria[];

pies: Subcategoria[];

maquillaje: Subcategoria[];

podologia: Subcategoria[];

masajes: Subcategoria[];

manicureninas: Subcategoria[];

baber: Subcategoria[];

extras: Subcategoria[];

cabello: Subcategoria[];

limpiezamen:Subcategoria[];
cabellomen:Subcategoria[];
unasmen:Subcategoria[];
masajesmen:Subcategoria[];

reservaPage: any;

ubicacionPage: any;

introPage: any;

perfilPage: any;

book: number=0;

precio: any=0

distrito:any;

promociones:any;

pedido = new Array();

muestradescripcion:boolean=true

public cate;

host:any;

existe:any;

p:any;

u:any;
elimina:any=false;


first:any=true;

footer:any='hidden';

private todo : FormGroup;

  constructor(private nav: NavController,public viewCtrl: ViewController,public server:ServerProvider,public menuCtrl: MenuController,public appCtrl: App,public modalCtrl: ModalController,public toastCtrl: ToastController,private formBuilder: FormBuilder,public alertCtrl: AlertController,public storage: Storage,private _categoria: CategoriasProvider,public navCtrl: NavController,public http: Http, public navParams: NavParams) {

         this.todo = this.formBuilder.group({

      experiencia: [''],
      referencia: [''],
      comentario: ['']


    });


         this.first=true;


         this.header='false';




         this.host=this.server.getMyGlobalVar()



       this.presentToast()



      this.storage.get('distrito').then((val) => {


        this.distrito=val

        if (val==null){

          this.distrito=1

        }

        this.cate = navParams.get("categoria");

        console.log('cate...',this.cate)



           


            this._categoria.getsubcategorias(this.cate.id,this.distrito)
              .subscribe(data => {

                //this.mano = data
                this.traesubcategorias(this.cate)

              });



              // this._categoria.getsubcategorias(1,this.distrito)
              // .subscribe(data => {

              //   this.mano = data
              //   this.traesubcategorias(this.cate)

              // });

              // this._categoria.getsubcategorias(2,this.distrito)
              // .subscribe(data => {

              //   this.pies = data
              //   this.traesubcategorias(this.cate)

              // });

              // this._categoria.getsubcategorias(3,this.distrito)
              // .subscribe(data => {
                
              //   this.maquillaje = data
              //   this.traesubcategorias(this.cate)

              // });

              // this._categoria.getsubcategorias(4,this.distrito)
              // .subscribe(data => {


              //   this.podologia = data
              //   this.traesubcategorias(this.cate)

              // });

              // this._categoria.getsubcategorias(5,this.distrito)
              // .subscribe(data => {

              //   this.masajes = data
              //   this.traesubcategorias(this.cate)

              // });

              // this._categoria.getsubcategorias(6,this.distrito)
              // .subscribe(data => {

              //   this.manicureninas = data
              //   this.traesubcategorias(this.cate)

              // }

              //   );

              // this._categoria.getsubcategorias(7,this.distrito)
              // .subscribe(data => {

              //   this.baber = data
              //   this.traesubcategorias(this.cate)

              // });


              // this._categoria.getsubcategorias(8,this.distrito)
              // .subscribe(data => {

              //   this.extras = data
              //   this.traesubcategorias(this.cate)
              // });


              // this._categoria.getsubcategorias(9,this.distrito)
              // .subscribe(data => {

              //   this.cabello = data
              //   this.traesubcategorias(this.cate)

              // });


              // this._categoria.getsubcategorias(10,this.distrito)
              // .subscribe(data =>{

              //    this.promociones = data
              //    this.traesubcategorias(this.cate)

              // });


              // this._categoria.getsubcategorias(11,this.distrito)
              // .subscribe(data => {
              //   this.limpiezamen = data

              //   this.traesubcategorias(this.cate)



              // });



              // this._categoria.getsubcategorias(13,this.distrito)
              // .subscribe(data => {

              //   this.cabellomen = data
              //   this.traesubcategorias(this.cate)
              // });

              // this._categoria.getsubcategorias(12,this.distrito)
              // .subscribe(data => {

              //   this.unasmen = data
              //   this.traesubcategorias(this.cate)

              // });


              // this._categoria.getsubcategorias(15,this.distrito)
              // .subscribe(data =>{ 

              //   this.masajesmen = data
              //   this.traesubcategorias(this.cate)

              // });


              // this.traesubcategorias(this.cate)

  

      });

 



      this.reservaPage = ReservaPage;

      this.ubicacionPage = UbicacionPage;

      this.cate = navParams.get("categoria");

      console.log('nva',this.cate)

    
      this.storage.get('sexo').then((val) => {


        console.log('sexo',val)

       if(val==null){

         val=1
       }


      this._categoria.getcategorias(val)
      .subscribe(data => {


        console.log('fgfgggf',data)
        this.categoria = data


      });


      });


	 

     

  
  }


    search(data){

      this.navCtrl.push(SearchPage, {data:data})
    }


  ionViewWillEnter(){

      console.log('ionViewDidEnter','Intro')


      this.header='false';

     
            this.storage.get('pedido').then((val) => {

              if(val){





                      this.pedido=val

                      this.book=this.pedido.length

                      this.precio=0

                      for(this.p in this.pedido){

                        console.log('cantidad......',this.pedido[this.p].cantidad)

                        this.precio=this.pedido[this.p].precio_descuento*this.pedido[this.p].cantidad+this.precio

                        this.precio=Math.round(this.precio*100)/100

                      }


              }



    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VentaPage');


  }
iralhome(){

    this.nav.setRoot(HomePage, {statuslogin: true});

}


openMenu() {

             console.log('hdhdhd')
   this.menuCtrl.open();
 }





 carritoModal() {


    this.storage.set('pedido', this.pedido)

    this.storage.set('precio', this.precio)





   let profileModal = this.modalCtrl.create(CarritoPage, { carrito:this.pedido});
   profileModal.onDidDismiss(data => {
     
       if(data.nivel=='ubicacion'){
          
          
       this.navCtrl.push(UbicacionPage, {})
         
       }

       console.log('oooo',data)

       if (data.pedido){

           this.book=data.pedido.length

           this.precio=0

          for(this.p in this.pedido){

          console.log('precio...',this.pedido[this.p].precio)
 
          this.precio=this.pedido[this.p].precio_descuento*this.pedido[this.p].cantidad+this.precio

          this.precio=Math.round(this.precio*100)/100

         //this.storage.set('precio', this.precio)
  
           }


       }

       



   });
   profileModal.present();








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






   presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Agrega todas las categorias que desees, para llenar tu carrito de compras',
      duration: 1000
    });
    toast.present();
  }

    agregatoast(data) {
    let toast = this.toastCtrl.create({
      message: 'Perfecto !! agregaste '+ data ,
      duration: 4000
    });
    toast.present();
  }

   toastcategoria(data) {
    let toast = this.toastCtrl.create({
      message:  data ,
      duration: 1000,
      position:'top'
    });
    toast.present();
  }

    showAlert(item) {

   



              let alert = this.alertCtrl.create({
              title: item.nombre,
              subTitle: item.descripcion,
              cssClass: 'alertCustomCss',
              inputs: [
                {
                  name: 'cantidad',
                  placeholder: 'Ingrese Cantidad',
                  type:'number'
                },
               
              ],
              buttons: [
                
                {
                  text: 'Lo Quiero',
                  cssClass:'alertcss',
                  handler: data => {

                      item.cantidad=data
                      this.agregacarrito(item)
 
                  }
                }
              ]
            });
            alert.present();




  }




  




  traesubcategorias(data){

console.log('traesubcategorias..........',data.id)

 



this.cate=data

//this.toastcategoria(data.nombre)

    this._categoria.getsubcategorias(data.id,this.distrito)
    .subscribe(data => this.subcategoria = data);




  // if (data.id==1){

  //   this.subcategoria = this.mano




  // }

  // if (data.id==2){

  //   this.subcategoria = this.pies



    
  // }

  //  if (data.id==3){

  //   this.subcategoria = this.maquillaje


  // }

  //  if (data.id==4){

  //   this.subcategoria = this.podologia
  // }

  //  if (data.id==5){

  //   this.subcategoria = this.masajes
  // }

  //   if (data.id==6){

  //   this.subcategoria = this.manicureninas
  // }

  //  if (data.id==7){

  //   this.subcategoria = this.baber
  // }

  // if (data.id==8){

  //   this.subcategoria = this.extras
  // }

  //  if (data.id==9){

  //   this.subcategoria = this.cabello
  // }

  // if (data.id==10){

  //   this.subcategoria = this.promociones
  // }

  //   if (data.id==11){

  //    console.log('entre...',this.limpiezamen)

  //   this.subcategoria = this.limpiezamen
  // }


  // if (data.id==12){

  //   this.subcategoria = this.unasmen
  // }


  // if (data.id==13){

  //   this.subcategoria = this.cabellomen
  // }


  // if (data.id==15){

  //   this.subcategoria = this.masajesmen
  // }




  }

  


  agregacarrito(data){


    //this.agregatoast(data.nombre)


          console.log('ENTRE......',data)

          if(data!=undefined){


                this.u=this.pedido.filter(c => c.id === data.id)




                 

             
                 if(this.u.length==0){


                      this.pedido.push(data);

                      console.log('precio...',this.precio) 

                      this.precio = this.precio+data.precio_descuento*data.cantidad


                      this.precio=Math.round(this.precio*100)/100
                     
                      this.book=this.book+1

                      this.storage.set('pedido', this.pedido)




                 }
                 else{


                             this.precio=0

                             for(this.p in this.pedido){

                                    console.log('precio...',this.pedido[this.p].precio)
                           
                                    this.precio=this.pedido[this.p].precio_descuento*this.pedido[this.p].cantidad+this.precio

                                    this.precio=Math.round(this.precio*100)/100

                                   //this.storage.set('precio', this.precio)
                            
                                     }

                 }


  
          }

          

  }

  quitacarrito(data){

      this.u=this.pedido.filter(c => c.id === data.id)

      console.log('quitando',this.u)

      const index: number = this.pedido.indexOf(data);

      if (index !== -1) {
          this.pedido.splice(index, 1);

          this.storage.set('pedido', this.pedido)
      }  

      

      if (this.u.length==1){
       
      this.book=this.book-1

      this.precio = this.precio-data.precio

      console.log('pedido',this.pedido)
      }

  }

  continuar(){

    console.log('avanza',this.pedido)



      this.storage.set('pedido', this.pedido)


      this.storage.set('precio', this.precio)

    this.storage.set('precio', this.precio)


      //this.appCtrl.getRootNav().push(UbicacionPage);



   this.navCtrl.push(UbicacionPage, {
      
    })


  }


  reset(data){

    console.log('resetando...',data,this.categoria)




for (let i = 0; i < this.categoria.length; i++) {


 this.categoria[i]['check']=true
         
    }
  


      data.check=false


  }


  enviasocia(data){

    
  let creds = JSON.stringify({ categoria: this.pedido, socia: data });



      let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    });



  this.http.post(this.server.getMyGlobalVar()+'nuevasocia/', creds, options)
    .subscribe(
      data => {

      })


  }




}







