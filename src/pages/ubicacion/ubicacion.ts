import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, ModalController,NavController, NavParams, ViewController, Platform,AlertController,App,ToastController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http,RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { SpinnerProvider } from '../../providers/spinner/spinner'
import { MapProvider } from '../../providers/map/map';
import { ReservaPage } from '../reserva/reserva';
import { RegistroPage } from '../../pages/registro/registro';
import { CarritoPage } from '../../pages/carrito/carrito';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.html',
})
export class UbicacionPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;

  map: any;
  address = '';
  reservaPage: any;
  ubicacion:any;
  referencia:any;

   today:any;
   anio:any;
   mes:any;
   dia:any;
   lat:any;
   lon:any;
   telefono:any;
   pedido:any;
   book:any;
   precio:any;
   p:any;
   gender:any;
   columna_1:any;
   monthNames: any;

  constructor(public server:ServerProvider,public storage: Storage,public navCtrl: NavController,
    public geolocation: Geolocation,
    public zone: NgZone,
    public platform: Platform,
    public localStorage: Storage,
    public mapService: MapProvider,
    public spinner: SpinnerProvider,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public appCtrl: App,
    public http: Http,
    public navParams: NavParams,public toastCtrl: ToastController,public modalCtrl: ModalController) {


      
      this.monthNames=['ene','3','3','ene','3','3','ene','3','3','ene','3','3' ]


      this.columna_1='col-10'


      this.reservaPage = ReservaPage;

      this.platform.ready().then(() => this.loadMaps());

      this.today = new Date();

      this.anio=String(this.today).split(" ")[3]

      this.mes=String(this.today).split(" ")[1]

      this.dia=String(this.today).split(" ")[2]

      if(this.mes=='Feb'){

        this.mes='02'
      }

      if(this.mes=='Mar'){

        this.mes='03'
      }

       if(this.mes=='Apr'){

        this.mes='04'
      }
       if(this.mes=='May'){

        this.mes='05'
      }

      if(this.mes=='Jun'){

        this.mes='06'
      }

       if(this.mes=='Jul'){

        this.mes='07'
      }


       if(this.mes=='Aug'){

        this.mes='08'
      }

             if(this.mes=='Set'){

        this.mes='09'
      }


       if(this.mes=='Oct'){

        this.mes='10'
      }


       if(this.mes=='Nov'){

        this.mes='11'
      }


       if(this.mes=='Dic'){

        this.mes='12'
      }


      this.today=this.anio+'-'+this.mes+'-'+this.dia
  }

      showAlert(data) {

      console.log(data)

    let alert = this.alertCtrl.create({
      title: 'My Look Xpress',
      subTitle: 'Porfavor ingrese '+data,
      buttons: ['OK']
    });
    alert.present();
  }


  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    this.ubicacion='jsjsjsj'
  }


   sacatelefono(dia,hora,ubicacion,referencia) {



         ///Registra///

   this.storage.get('telefono').then((val) => {

      console.log('token',val)

      if(val==null){



              let alert = this.alertCtrl.create({
              title: 'A que celular podemos comunicarnos?',
              inputs: [
                {
                  name: 'telefono',
                  placeholder: 'Telefono'
                },
               
              ],
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: data => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Enviar',
                  handler: data => {


                 this.storage.set('telefono', data.telefono)
                   
                     //this.actualiza(this.nombre,this.email,data.telefono)

                     // this.reserva(dia,hora,ubicacion,referencia) 

                  }
                }
              ]
            });
            alert.present();




      }
      else{


         // this.reserva(dia,hora,ubicacion,referencia)




      }

  });



    
  }



  ionViewWillEnter(){

    this.storage.get('pedido').then((val) => {

      this.pedido=val

      this.book = this.pedido.length

    });

     this.storage.get('ubicacion').then((val) => {

      this.ubicacion=val

    });

  }



  
   carritoModal() {



   let profileModal = this.modalCtrl.create(CarritoPage, { carrito:this.pedido});
   profileModal.onDidDismiss(data => {
     
       if(data.nivel=='ubicacion'){
          
          
       this.navCtrl.push(UbicacionPage, {})
         
       }

       console.log('oooo',data)

       if(data.pedido){

         this.book=data.pedido.length


       }

       
       this.precio=0

    for(this.p in this.pedido){

      console.log('precio...',this.pedido[this.p].precio)

      this.precio=this.pedido[this.p].precio+this.precio
    }



   });
   profileModal.present();

 }



  iralmenu(){

    this.navCtrl.popToRoot();

    
  }


     toastgenerico(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 2000,
      position:'bottom'
    });
    toast.present();
  }

  horarioservicio(){

    console.log('enviando,,,,,')

    this.toastgenerico('Nuestro horario de atención es de 08:30 AM a 08:30 PM')
  }



      agregatoast() {
    let toast = this.toastCtrl.create({
      message: 'Arrastra el mapa para indicarnos donde te encuentras',
      duration: 4000
    });
    toast.present();
  }


     toast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 4000
    });
    toast.present();
  }

   cargandomapa() {
    let toast = this.toastCtrl.create({
      message: 'Estamos localizandote para llegar hacia ti',
      duration: 4000
    });
    toast.present();
  }




  loadMaps() {
    if (!!google) {
      this.initializeMap();
      this.initAutocomplete();
    } else {
      this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.')
    }
  }

  initializeMap() {
    let that = this;
    that.currentLocation();
    this.zone.run(() => {
      var mapEle = this.mapElement.nativeElement;
      this.map = new google.maps.Map(mapEle, {
        zoom: 16,
        center: { lat: -12.971599, lng: -77.594563 },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
        disableDoubleClickZoom: false,
        disableDefaultUI: true,
        zoomControl: false,
        scaleControl: true,
      });


        // Map drag started
        this.map.addListener('dragstart', function() {
          console.log('Drag start');
        });
        // Map dragging
        this.map.addListener('drag', function() {
          that.address = 'Searching...';
        });
        //Reload markers every time the map moves
        this.map.addListener('dragend', function() {
          let map_center = that.getMapCenter();
          let latLngObj = {'lat': map_center.lat(), 'long': map_center.lng() };

      

          that.ubicacion=latLngObj
          
          that.getAddress(latLngObj);
        });

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        google.maps.event.trigger(this.map, 'resize');
        mapEle.classList.add('show-map');
      });

      google.maps.event.addListener(this.map, 'bounds_changed', () => {
        this.zone.run(() => {
          this.resizeMap();
        });
      });


    });
  }

  initAutocomplete(): void {

    

    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');


    this.createAutocomplete(this.addressElement).subscribe((location) => {
      console.log('Searchdata', location);
      let latLngObj = {'lat': location.lat(), 'long': location.lng()};




      this.getAddress(latLngObj);

      this.ubicacion=latLngObj

      
      let options = {
        center: location,
        zoom: 16
      };
      this.map.setOptions(options);
    });
  }

   showAlertlocaliza() {

  

    let alert = this.alertCtrl.create({
      title: 'Permiso',
      subTitle: 'Requerimos tu ubicación para poder atenderte, y brindarte un mejor servicio',
      cssClass: 'alertCustomCss',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
           this.loadMaps()
        }
      }]

    });
    alert.present();
  }





  currentLocation() {
    //this.spinner.load();

    

    this.cargandomapa()
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let latLngObj = {'lat': position.coords.latitude, 'long': position.coords.longitude};
      // Display  Marker
      this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      //alert(latLngObj)
      //this.storage.set('ubicacion', latLngObj)


      // this.storage.get('distrito').then((val) => { console.log('actual distrito',val)

      //   console.log('return...',this.sacaactualdistrito(val))

      // })

      this.ubicacion=latLngObj
      this.getAddress(latLngObj);

      //this.spinner.dismiss();

      this.agregatoast()
      localStorage.setItem('current_latlong', JSON.stringify(latLngObj));
      return latLngObj;

    }, (err) => {
      console.log(err);
    });
  }

  getAddress(latLngObj) {
    // Get the address object based on latLngObj
    this.mapService.getStreetAddress(latLngObj).subscribe(
      s_address => {
        if (s_address.status == "ZERO_RESULTS") {
          this.mapService.getAddress(latLngObj).subscribe(
            address => {
              this.address = address.results[0].formatted_address;
              this.getAddressComponentByPlace(address.results[0], latLngObj);
            },
            err => console.log("Error in getting the street address " + err)
          )
        } else {


          console.log('ingrese.....',s_address)
          this.address = s_address.results[0].formatted_address;
          this.referencia = s_address.results[0].formatted_address;

          this.getAddressComponentByPlace(s_address.results[0], latLngObj);
          //alert(latLngObj)
          //this.storage.set('ubicacion', latLngObj)
          //alert(this.address);
        }
      },
      err => {
        //alert('No Address found ' + err);
      }
    );
  }

  getMapCenter(){
    return this.map.getCenter()
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          let latLngObj = {'lat': place.geometry.location.lat(), 'long': place.geometry.location.lng()}
          //this.getAddress(latLngObj);
          sub.next(place.geometry.location);
        }
      });
    });
  }

  getAddressComponentByPlace(place, latLngObj) {
    var components;

    components = {};

    for(var i = 0; i < place.address_components.length; i++){
      let ac = place.address_components[i];
      components[ac.types[0]] = ac.long_name;
    }

    let addressObj = {
      street: (components.street_number) ? components.street_number : 'not found',
      area: components.route,
      city: (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality,
      country: (components.administrative_area_level_1) ? components.administrative_area_level_1 : components.political,
      postCode: components.postal_code,
      loc: [latLngObj.long, latLngObj.lat],
      address: this.address
    }
    localStorage.clear();
    localStorage.setItem('carryr_customer', JSON.stringify(addressObj));
    return components;
  }

  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  errorAlert(title, message) {
    alert('Error in Alert');
  }




  reserva(dia,hora,ubicacion,referencia,tipo,datolugar){

      console.log('hhddh',dia,hora)



      console.log(dia.length)



     if(!hora){

         this.showAlert('la hora')
     }
     if(!dia ){

         this.showAlert('el dia')
     }

     if(dia.length<3 ){

         this.showAlert('el dia')
     }

      if(!referencia){

         this.showAlert('una direccion')
     }

     if( dia && hora && referencia &&  dia.length >2 ){


         this.storage.set('dia', dia)

         this.storage.set('hora', hora)

         this.storage.set('ubicacion', ubicacion)

         this.storage.set('referencia', referencia)

         this.storage.set('tipo', tipo)

          this.storage.set('datolugar', datolugar)

         



         ///Registra///

           this.storage.get('token').then((val) => {

      console.log('token',val)

      if(val==null){

        console.log('nullll')

        this.presentProfileModal()

       this.spinner.dismiss();


      }
      else{


          //this.appCtrl.getRootNav().push(ReservaPage);

          console.log('hora...',hora)

          if (hora >'08:00' && hora<'20:00'){

            console.log('entre cagada',)


      this.navCtrl.push(ReservaPage, {
      
      })


          
          }
          else
          {

            this.toast('Modifique el horario, Nuestro horario de atención es de 08:30 AM a 08:30 PM')

          }





      }

  });














     }

  

  }

   presentProfileModal() {
   let profileModal = this.modalCtrl.create(RegistroPage, { userId: 8675309 });
   profileModal.present();
 }



  sacaactualdistrito(ubicacion) {


  let creds = JSON.stringify({ ubicacion: ubicacion});



  let options: RequestOptions = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    });


  this.http.post(this.server.getMyGlobalVar()+'infodistrito/', creds, options)
    .subscribe(
      data => {


      this.lat = JSON.parse(data['_body'])[0]['latitud']

      this.lon = JSON.parse(data['_body'])[0]['longitud']

       

      })


}




}
