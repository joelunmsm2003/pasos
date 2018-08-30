var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, NgZone } from '@angular/core';
import { App, Nav, ModalController, IonicPage, NavController, NavParams, Platform, AlertController, ToastController } from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { Http, RequestOptions, Headers } from '@angular/http';
import { PortadaProvider } from '../../providers/portada/portada';
import { Storage } from '@ionic/storage';
import { MapProvider } from '../../providers/map/map';
import { VentaPage } from '../venta/venta';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { PerfilPage } from '../perfil/perfil';
import { LoginPage } from '../login/login';
import { ServicioPage } from '../../pages/servicio/servicio';
import { HistorialPage } from '../historial/historial';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AyudaPage } from '../ayuda/ayuda';
import { LoginprincipalPage } from '../loginprincipal/loginprincipal';
import { NotificacionPage } from '../notificacion/notificacion';
import { Geolocation } from '@ionic-native/geolocation';
import { Slides } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the MenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MenPage = /** @class */ (function () {
    function MenPage(server, appCtrl, toastCtrl, _photo, alertCtrl, http, mapService, geolocation, zone, platform, modalCtrl, socialSharing, storage, _perfil, _categoria, navCtrl, navParams) {
        var _this = this;
        this.server = server;
        this.appCtrl = appCtrl;
        this.toastCtrl = toastCtrl;
        this._photo = _photo;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.mapService = mapService;
        this.geolocation = geolocation;
        this.zone = zone;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.socialSharing = socialSharing;
        this.storage = storage;
        this._perfil = _perfil;
        this._categoria = _categoria;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.address = '';
        this.storage.get('sexo').then(function (val) {
            if (val == null) {
                _this.sacasexo1();
            }
        });
        this.primerencuentro();
        this.host = this.server.getMyGlobalVar();
        //alert(this.device.uuid);
        this.perfilPage = PerfilPage;
        this.servicioPage = ServicioPage;
        this.historialPage = HistorialPage;
        this.loginPage = LoginPage;
        this.loginprincipalPage = LoginprincipalPage;
        this.ventaPage = VentaPage;
        this.ayudaPage = AyudaPage;
        ///Por default
        this._categoria.getcategorias(2)
            .subscribe(function (data) { return _this.categoria = data; });
        this._photo.getfotosdeportada(2)
            .subscribe(function (data) {
            _this.photo1 = data[0].photo;
            _this.link1 = data[0].enlace;
            _this.photo2 = data[1].photo;
            _this.link2 = data[1].enlace;
            _this.photo3 = data[2].photo;
            _this.link3 = data[2].enlace;
            _this.photo4 = data[3].photo;
            _this.link4 = data[3].enlace;
        });
        this._photo.getfotosdepublicidad()
            .subscribe(function (data) {
            _this.photo5 = data[0].photo;
            _this.link5 = data[0].enlace;
            _this.photo6 = data[1].photo;
            _this.link6 = data[1].enlace;
            _this.photo7 = data[2].photo;
            _this.link7 = data[2].enlace;
            _this.photo8 = data[3].photo;
            _this.link8 = data[3].enlace;
        });
        /////
    }
    MenPage.prototype.sacadistrito = function () {
        var _this = this;
        var alert1 = this.alertCtrl.create();
        alert1.setTitle('Cual es tu distrito?');
        alert1.addInput({
            type: 'radio',
            label: 'Lima',
            value: '1',
            checked: false
        });
        this.http.get(this.server.getMyGlobalVar() + 'distrito/').subscribe(function (data) {
            for (var _i = 0, _a = JSON.parse(data['_body']); _i < _a.length; _i++) {
                var entry = _a[_i];
                console.log(entry['nombre']);
                alert1.addInput({
                    type: 'radio',
                    label: entry['nombre'],
                    value: entry['id'],
                    checked: false
                });
            }
        });
        alert1.addButton('Cancel');
        alert1.addButton({
            text: 'OK',
            handler: function (data) {
                _this.storage.set('distrito', data);
                console.log(data);
                _this.primerencuentro();
                // this.testRadioOpen = false;
                // this.testRadioResult = data;
            }
        });
        alert1.present();
    };
    MenPage.prototype.sacasexo1 = function () {
        var _this = this;
        var alertsexo = this.alertCtrl.create({
            title: 'Escoge tu genero',
            cssClass: 'sexocss',
            buttons: [
                {
                    text: '',
                    role: 'cancel',
                    handler: function () {
                        _this.storage.set('sexo', 1);
                        _this.sexo = 1;
                        _this.sacacategoria(1);
                    }
                },
                {
                    text: '',
                    handler: function () {
                        _this.storage.set('sexo', 2);
                        _this.sacacategoria(2);
                    }
                }
            ]
        });
        alertsexo.present();
    };
    MenPage.prototype.sacacategoria = function (sexo) {
        this.navCtrl.popToRoot();
        //     this._categoria.getcategorias(sexo)
        //       .subscribe(data => this.categoria = data);
        //                     this._photo.getfotosdeportada(sexo)
        // .subscribe(data => {
        //      this.photo1=data[0].photo;
        //      this.link1=data[0].enlace
        //      this.photo2=data[1].photo;
        //      this.link2=data[1].enlace
        //      this.photo3=data[2].photo
        //      this.link3=data[2].enlace
        //      this.photo4=data[3].photo
        //      this.link4=data[3].enlace
        // })
        //         this._photo.getfotosdepublicidad()
        // .subscribe(data => {
        //      this.photo5=data[0].photo
        //      this.link5=data[0].enlace
        //      this.photo6=data[1].photo
        //      this.link6=data[1].enlace
        //      this.photo7=data[2].photo
        //      this.link7=data[2].enlace
        //      this.photo8=data[3].photo
        //      this.link8=data[3].enlace
        // })
    };
    MenPage.prototype.primerencuentro = function () {
        var toast = this.toastCtrl.create({
            message: 'Escoge uno de nuestros servicios a delivery que disponemos para ti',
            position: 'bottom',
            duration: 5000
        });
        toast.present();
    };
    MenPage.prototype.loginModal = function () {
        var profileModal = this.modalCtrl.create(LoginprincipalPage);
        profileModal.present();
    };
    MenPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad', 'Intro');
        this.currentLocation();
    };
    MenPage.prototype.ionViewWillLoad = function () {
        console.log('ionViewWillLoad', 'Intro');
    };
    MenPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter', 'Intro');
        this.storage.get('token').then(function (val) {
            if (val) {
                _this.logeado = true;
            }
        });
    };
    MenPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log('ionViewDidEnter', 'Intro');
        this.storage.get('token').then(function (val) {
            if (val) {
                _this.logeado = true;
            }
        });
    };
    MenPage.prototype.iraventas = function (data) {
        // this.navCtrl.push(VentaPage, {
        //    categoria: data,
        //  })
        this.appCtrl.getRootNav().push(VentaPage, {
            categoria: data,
        });
    };
    MenPage.prototype.gonoti = function () {
        this.navCtrl.push(NotificacionPage, {
            user: 'data',
        });
    };
    MenPage.prototype.shareSheetShare = function () {
        this.socialSharing.share("Registrate", "Atreveteeetee sal del closeet", "https://st2.depositphotos.com/5328332/12205/v/950/depositphotos_122057578-stock-illustration-express-delivery-of-fashion-and.jpg", "https://play.google.com/store/apps/details?id=io.codigito.mylookexpress&hl=es").then(function () {
            console.log("shareSheetShare: Success");
        }).catch(function () {
            console.error("shareSheetShare: failed");
        });
    };
    ///Saca ubicacion
    MenPage.prototype.currentLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var latLngObj = { 'lat': position.coords.latitude, 'long': position.coords.longitude };
            // Display  Marker
            //this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            //alert(latLngObj)
            //this.storage.set('ubicacion', latLngObj)
            _this.ubicacion = latLngObj;
            _this.getAddress(latLngObj);
            localStorage.setItem('current_latlong', JSON.stringify(latLngObj));
            return latLngObj;
        }, function (err) {
            console.log(err);
        });
    };
    MenPage.prototype.getAddress = function (latLngObj) {
        var _this = this;
        // Get the address object based on latLngObj
        this.mapService.getStreetAddress(latLngObj).subscribe(function (s_address) {
            if (s_address.status == "ZERO_RESULTS") {
                _this.mapService.getAddress(latLngObj).subscribe(function (address) {
                    _this.address = address.results[0].formatted_address;
                    //this.getAddressComponentByPlace(address.results[0], latLngObj);
                }, function (err) { return console.log("Error in getting the street address " + err); });
            }
            else {
                console.log('ingrese.....', s_address);
                _this.address = s_address.results[0].formatted_address;
                _this.sacaactualdistrito(_this.address);
                _this.referencia = s_address.results[0].formatted_address;
                //this.getAddressComponentByPlace(s_address.results[0], latLngObj);
                //alert(latLngObj)
                //this.storage.set('ubicacion', latLngObj)
                //alert(this.address);
            }
        }, function (err) {
            //alert('No Address found ' + err);
        });
    };
    MenPage.prototype.sacaactualdistrito = function (ubicacion) {
        var _this = this;
        var creds = JSON.stringify({ ubicacion: ubicacion });
        var options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        this.http.post(this.server.getMyGlobalVar() + 'obtienedistrito/', creds, options)
            .subscribe(function (data) {
            _this.storage.set('distrito', data['_body']);
        });
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MenPage.prototype, "nav", void 0);
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], MenPage.prototype, "slides", void 0);
    MenPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-men',
            templateUrl: 'men.html',
            providers: [CategoriasProvider, PortadaProvider, ServerProvider]
        }),
        __metadata("design:paramtypes", [ServerProvider, App, ToastController, PortadaProvider, AlertController, Http, MapProvider, Geolocation, NgZone, Platform, ModalController, SocialSharing, Storage, PerfilProvider, CategoriasProvider, NavController, NavParams])
    ], MenPage);
    return MenPage;
}());
export { MenPage };
//# sourceMappingURL=men.js.map