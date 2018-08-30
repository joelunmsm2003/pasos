import { Component } from '@angular/core';
import { ToastController,IonicPage, NavController, NavParams,ModalController,App} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { Clipboard } from '@ionic-native/clipboard';
import { LoginprincipalPage } from '../loginprincipal/loginprincipal';



/**
 * Generated class for the CompartirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compartir',
  templateUrl: 'compartir.html',
})
export class CompartirPage {


  codigo_compartir:any;

  constructor( public appCtrl: App,public modalCtrl: ModalController,public toastCtrl: ToastController,private clipboard: Clipboard,private _perfil: PerfilProvider,private socialSharing: SocialSharing,public navCtrl: NavController, public navParams: NavParams) {
  

   this._perfil.miperfil()
      .subscribe(data => {

          this.codigo_compartir=data[0]['codigo_compartir']

          console.log('perfil...',data)


      },
      error=>{

          console.log(error)
         //this.appCtrl.getRootNav().setRoot(LoginprincipalPage)

      })



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompartirPage');
  }


       shareSheetShare() {
    this.socialSharing.share("Registrate", "Comparte la aplicacion con el codigo y recibe un servicio gratis "+this.codigo_compartir, "https://lh3.googleusercontent.com/i7F_CVDccNVkUCP04bfWtBaea3a-ptwfv6Bj4X0WxVD9UyMz4cdZeJ9MV-o87-1zF9c=s180-rw", "https://play.google.com/store/apps/details?id=io.codigito.mylookexpress&hl=es").then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  copiar(data){



    this.clipboard.copy(data);

    this.presentToast()


  }


   presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Codigo copiado',
      duration: 4000
    });
    toast.present();
  }


 loginModal() {
   let profileModal = this.modalCtrl.create(LoginprincipalPage, { userId: 8675309 });
   profileModal.present();
 }





  

}
