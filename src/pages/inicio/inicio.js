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
import { HomePage } from '../home/home';
import { IntroPage } from '../intro/intro';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MenPage } from '../men/men';
import { HistorialPage } from '../historial/historial';
import { LoginprincipalPage } from '../loginprincipal/loginprincipal';
import { PerfilPage } from '../perfil/perfil';
import { CompartirPage } from '../compartir/compartir';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InicioPage = /** @class */ (function () {
    function InicioPage(server, socialSharing, alertCtrl, platform, menuCtrl, navCtrl, _categoria, localStorage, viewCtrl, storage, events, zone, appCtrl, navParams, modalCtrl) {
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
        this.host = this.server.getMyGlobalVar();
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
            { title: 'Ingresar', component: LoginprincipalPage },
            { title: 'Compartir', component: CompartirPage },
            { title: 'Mi Perfil', component: PerfilPage },
            { title: 'Mis Reservas', component: HistorialPage }
        ];
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
    InicioPage.prototype.openMenu = function () {
        this.menuCtrl.open();
    };
    InicioPage.prototype.closeMenu = function () {
        this.menuCtrl.close();
    };
    InicioPage.prototype.toggleMenu = function () {
        this.menuCtrl.toggle();
    };
    InicioPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad Home');
        this.storage.get('token').then(function (val) {
            console.log('logerrrr', val);
            if (val) {
                _this.logeado = true;
            }
        });
    };
    InicioPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('ionViewWillEnter Home');
        this.storage.get('token').then(function (val) {
            if (val) {
                _this.logeado = true;
                console.log('999', _this.logeado);
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
    InicioPage.prototype.ionViewDidEnter = function () {
        //this.storage.get('token').then((val) => {if(val){this.appCtrl.getRootNav().push(IntroPage);}});
        var _this = this;
        console.log('ionViewDidEnter Home');
        this.storage.get('token').then(function (val) {
            if (val) {
                _this.logeado = true;
            }
        });
    };
    InicioPage.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
        this.closeMenu();
    };
    InicioPage.prototype.openHome = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(HomePage);
        this.closeMenu();
    };
    InicioPage.prototype.salir = function () {
        console.log('saliendo..');
        this.storage.remove('token');
        //this.navCtrl.push(IntroPage);
        this.platform.exitApp();
    };
    InicioPage.prototype.sacacategoria = function (sexo) {
        if (sexo == 1) {
            this.xxxPage = IntroPage;
        }
        if (sexo == 2) {
            this.xxxPage = MenPage;
        }
    };
    InicioPage.prototype.loginModal = function () {
        var profileModal = this.modalCtrl.create(LoginprincipalPage, { userId: 8675309 });
        profileModal.present();
    };
    InicioPage.prototype.sacasexo = function () {
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
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], InicioPage.prototype, "nav", void 0);
    InicioPage = __decorate([
        Component({
            selector: 'page-inicio',
            templateUrl: 'inicio.html',
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
            ModalController])
    ], InicioPage);
    return InicioPage;
}());
export { InicioPage };
//# sourceMappingURL=inicio.js.map