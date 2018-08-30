import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, Nav,MenuController,App,AlertController,Events,ModalController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { Categoria } from '../../providers/categorias/categoria';

import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { SpinnerProvider } from '../../providers/spinner/spinner'
import { MapProvider } from '../../providers/map/map';
import { CuandoPage } from '../cuando/cuando';
import { VentaPage } from '../venta/venta';
import { HomePage } from '../home/home';
import { IntroPage } from '../intro/intro';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MenPage } from '../men/men';
import { HistorialPage } from '../historial/historial';
import { LoginPage } from '../login/login';
import { LoginprincipalPage } from '../loginprincipal/loginprincipal';

import { ServicioPage } from '../servicio/servicio';
import { PerfilPage } from '../perfil/perfil';
import { RegistroPage } from '../registro/registro';
import { AyudaPage } from '../ayuda/ayuda';

import { CompartirPage } from '../compartir/compartir';
import { RegistroprincipalPage } from '../registroprincipal/registroprincipal';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
  providers:[ServerProvider]
})
export class InicioPage {


  host:any;


  xxxPage :any= IntroPage;

  @ViewChild(Nav) nav: Nav;

  ventaPage:any;
  logeado:any=false;
  sexo:any;

  categoria: Categoria[];
  pagesnologeado: Array<{title: string, component: any}>;
  pageslogeado: Array<{title: string, component: any}>;
  pages: Array<{title: string, component: any}>;



  constructor(public server:ServerProvider,private socialSharing: SocialSharing,public alertCtrl: AlertController,public platform: Platform,public menuCtrl: MenuController,public navCtrl: NavController,
    private _categoria: CategoriasProvider,
    public localStorage: Storage,
    public viewCtrl: ViewController,
    private storage:Storage,
    public events: Events,
    private zone: NgZone,
    public appCtrl: App,
    public navParams: NavParams,
    public modalCtrl: ModalController) {


     ///Lanza Login



 

   
      this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });

      
      this.ventaPage = VentaPage;

      this.host=this.server.getMyGlobalVar()

      this._categoria.getcategorias(1)
      .subscribe(data => this.categoria = data);



    this.host=this.server.getMyGlobalVar()


     this.pagesnologeado = [


      { title: 'Inicio', component: HomePage },
      { title: 'Ingresar', component: LoginprincipalPage },
      { title: 'Compartir', component: CompartirPage }




    ];



     this.pageslogeado = [

      { title: 'Inicio', component: HomePage },
      { title: 'Mi Perfil', component: PerfilPage },
      { title: 'Compartir', component: CompartirPage },
      { title: 'Mis Reservas', component: HistorialPage }



    ];


    this.pages = [

      { title: 'Inicio', component: HomePage },
      { title: 'Ingres00ar', component: LoginprincipalPage },
      { title: 'Compartir', component: CompartirPage },
      { title: 'Mi Perfil', component: PerfilPage },
      { title: 'Mis Reservas', component: HistorialPage }



    ];






      this.storage.get('token').then((val) => {


           if(val){

             
                this.logeado=true

                    

           }

      });


       this.storage.get('sexo').then((val) => {



           console.log('sexo',val)

           if(val==1){

             this.xxxPage = IntroPage;

           }

           if(val==2){


             this.xxxPage = MenPage;


           }

           

           if(val==null){

             
                
               this.sacasexo()
                    

           }

      });

          








  }




   

openMenu() {
   this.menuCtrl.open();
 }

 closeMenu() {
   this.menuCtrl.close();
 }

 toggleMenu() {
   this.menuCtrl.toggle();
 }
  

  ionViewDidLoad() {

      console.log('ionViewDidLoad Home')


      this.storage.get('token').then((val) => {


           console.log('logerrrr',val)


           if(val){

             
                this.logeado=true

                    

           }

      });



  }

   ionViewWillEnter() {
    console.log('ionViewWillEnter Home');

     this.storage.get('token').then((val) => {


           if(val){

             
                this.logeado=true

                console.log('999',this.logeado)

                    

           }

      });


     this.storage.get('newservice').then((val) => {

           console.log('que dato es',val)


           if(val==1){

                   
                  this.xxxPage = HistorialPage;

                  this.storage.set('newservice', 0)

                    

           }

      });
  }

  ionViewDidEnter() {

    //this.storage.get('token').then((val) => {if(val){this.appCtrl.getRootNav().push(IntroPage);}});

    console.log('ionViewDidEnter Home')

     this.storage.get('token').then((val) => {


           if(val){

             
                this.logeado=true

                    

           }

      });


     
  }

 openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

    this.closeMenu()
  }


 openHome(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(HomePage);

    this.closeMenu()
  }



 salir(){

    console.log('saliendo..')

    this.storage.remove('token')


    
    //this.navCtrl.push(IntroPage);

     this.platform.exitApp();


  }


  sacacategoria(sexo){


    if (sexo==1){


          this.xxxPage = IntroPage;

         }

         if (sexo==2){


          this.xxxPage = MenPage;
           
         }


      
  }


 loginModal() {
   let profileModal = this.modalCtrl.create(LoginprincipalPage, { userId: 8675309 });
   profileModal.present();
 }





  sacasexo(){

    this.closeMenu()

    this.storage.remove('sexo')

    //this.navCtrl.push(IntroPage);

    let alertsexo = this.alertCtrl.create({
    title: 'Escoge tu género',
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


///




}
