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
import { NavController, NavParams, ViewController, Platform, Nav, MenuController, App, AlertController, Events, ModalController } from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { Storage } from '@ionic/storage';
import { VentaPage } from '../venta/venta';
import { Device } from '@ionic-native/device';
import { IntroPage } from '../intro/intro';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MenPage } from '../men/men';
import { HistorialPage } from '../historial/historial';
import { LoginprincipalPage } from '../loginprincipal/loginprincipal';
import { PerfilPage } from '../perfil/perfil';
import { AuthHttp } from 'angular2-jwt';
import { CompartirPage } from '../compartir/compartir';
import { RequestOptions, Headers } from '@angular/http';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomePage = /** @class */ (function () {
    function HomePage(server, socialSharing, alertCtrl, platform, menuCtrl, navCtrl, _categoria, localStorage, viewCtrl, storage, events, zone, appCtrl, navParams, modalCtrl, authHttp, device) {
        var _this = this;
        this.server = server;
        this.socialSharing = socialSharing;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this._categoria = _categoria;
        this.localStorage = localStorage;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.events = events;
        this.zone = zone;
        this.appCtrl = appCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.authHttp = authHttp;
        this.device = device;
        this.xxxPage = IntroPage;
        this.logeado = false;
        this.events.subscribe('updateScreen', function () {
            _this.zone.run(function () {
                console.log('force update the screen');
            });
        });
        this.ventaPage = VentaPage;
        this.host = this.server.getMyGlobalVar();
        this._categoria.getcategorias(1)
            .subscribe(function (data) { return _this.categoria = data; });
        this.pagesnologeado = [
            { title: 'Inicio', component: HomePage_1 },
            { title: 'Compartir', component: CompartirPage }
        ];
        this.pageslogeado = [
            { title: 'Inicio', component: HomePage_1 },
            { title: 'Mi Perfil', component: PerfilPage },
            { title: 'Compartir', component: CompartirPage },
            { title: 'Mis Reservas', component: HistorialPage }
        ];
        this.pages = [
            { title: 'Inicio', component: HomePage_1 },
            { title: 'Ingresar', component: LoginprincipalPage },
            { title: 'Compartir', component: CompartirPage },
            { title: 'Mi Perfil', component: PerfilPage },
            { title: 'Mis Reservas', component: HistorialPage }
        ];
        var creds = JSON.stringify({ model: this.device.model, tipo: this.device.version });
        console.log('creds....', creds);
        var options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        this.authHttp.post(this.server.getMyGlobalVar() + 'guardadatosmovil/', creds, options)
            .subscribe(function (data) {
            console.log(data);
        });
        this.storage.get('token').then(function (val) {
            if (val) {
                _this.logeado = true;
            }
        });
        this.storage.get('sexo').then(function (val) {
            console.log('sexo', val);
            if (val == 1) {
                _this.xxxPage = IntroPage;
            }
            if (val == 2) {
                _this.xxxPage = MenPage;
            }
            if (val == null) {
                _this.sacasexo();
            }
        });
    }
    HomePage_1 = HomePage;
    HomePage.prototype.iralogin = function () {
        this.appCtrl.getRootNav().setRoot(LoginprincipalPage);
    };
    HomePage.prototype.openMenu = function () {
        console.log('abriendo...');
        this.menuCtrl.open();
    };
    HomePage.prototype.closeMenu = function () {
        this.menuCtrl.close();
    };
    HomePage.prototype.toggleMenu = function () {
        this.menuCtrl.toggle();
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad Home');
        //this.logeado = this.navParams.get('statuslogin')
        console.log('Parametro.........................', this.beta);
        this.storage.get('token').then(function (val) {
            console.log('loger me valer', val);
            if (val) {
                _this.logeado = true;
            }
        });
    };
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter Home');
        console.log('ionViewDidEnter Home ingreseeeeeeeeeeeeeee');
        this.storage.get('token').then(function (val) {
            if (val) {
                console.log('ingrese a val');
                _this.logeado = true;
            }
        });
        this.storage.get('newservice').then(function (val) {
            console.log('que dato es', val);
            if (val == 1) {
                _this.xxxPage = HistorialPage;
                _this.storage.set('newservice', 0);
            }
        });
    };
    HomePage.prototype.ionViewDidEnter = function () {
    };
    HomePage.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
        this.closeMenu();
    };
    HomePage.prototype.openHome = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(HomePage_1);
        this.closeMenu();
    };
    HomePage.prototype.salir = function () {
        console.log('saliendo..');
        this.storage.remove('token');
        //this.navCtrl.push(IntroPage);
        this.platform.exitApp();
    };
    HomePage.prototype.sacacategoria = function (sexo) {
        if (sexo == 1) {
            this.xxxPage = IntroPage;
        }
        if (sexo == 2) {
            this.xxxPage = MenPage;
        }
    };
    HomePage.prototype.sacasexo = function () {
        var _this = this;
        this.closeMenu();
        this.storage.remove('sexo');
        //this.navCtrl.push(IntroPage);
        var alertsexo = this.alertCtrl.create({
            title: 'Escoge tu género',
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
    var HomePage_1;
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], HomePage.prototype, "nav", void 0);
    HomePage = HomePage_1 = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
            providers: [ServerProvider]
        }),
        __metadata("design:paramtypes", [ServerProvider, SocialSharing, AlertController, Platform, MenuController, NavController,
            CategoriasProvider,
            Storage,
            ViewController,
            Storage,
            Events,
            NgZone,
            App,
            NavParams,
            ModalController,
            AuthHttp, Device])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map