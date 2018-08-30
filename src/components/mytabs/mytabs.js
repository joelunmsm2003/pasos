var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { App, NavController, NavParams, Platform } from 'ionic-angular';
import { IntroPage } from '../../pages/intro/intro';
import { PerfilPage } from '../../pages/perfil/perfil';
import { LoginPage } from '../../pages/login/login';
import { LoginprincipalPage } from '../../pages/loginprincipal/loginprincipal';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HistorialPage } from '../../pages/historial/historial';
import { Storage } from '@ionic/storage';
import { AyudaPage } from '../../pages/ayuda/ayuda';
/**
 * Generated class for the MytabsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var MytabsComponent = /** @class */ (function () {
    function MytabsComponent(socialSharing, platform, appCtrl, storage, navCtrl, navParams) {
        var _this = this;
        this.socialSharing = socialSharing;
        this.platform = platform;
        this.appCtrl = appCtrl;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.myVar = true;
        this.perfilPage = PerfilPage;
        this.introPage = IntroPage;
        this.historialPage = HistorialPage;
        this.loginPage = LoginPage;
        this.storage.get('token').then(function (val) {
            console.log('Token....', val);
            _this.logeado = val;
            if (_this.logeado == null) {
                _this.nologeado = true;
                _this.logeado = null;
            }
            if (_this.logeado) {
                _this.logeado = true;
                _this.nologeado = null;
            }
        });
    }
    MytabsComponent.prototype.loginprincipal = function () {
        console.log('queeeee');
        this.navCtrl.push(LoginprincipalPage);
    };
    MytabsComponent.prototype.ayuda = function () {
        console.log('queeeee');
        this.navCtrl.push(AyudaPage);
    };
    MytabsComponent.prototype.home = function () {
        this.navCtrl.popToRoot();
    };
    MytabsComponent.prototype.ionViewDidLoad = function () {
        console.log('Entro......');
    };
    MytabsComponent.prototype.ionViewWillEnter = function () {
        console.log('Entro..wwww....');
    };
    MytabsComponent.prototype.salircliente = function () {
        console.log('saliendo..');
        this.storage.remove('token');
        this.storage.remove('grupo');
        //this.navCtrl.push(IntroPage);
        this.platform.exitApp();
    };
    MytabsComponent.prototype.shareSheetShare = function () {
        this.socialSharing.share("Registrate", "Atreveteeetee sal del closeet", "https://st2.depositphotos.com/5328332/12205/v/950/depositphotos_122057578-stock-illustration-express-delivery-of-fashion-and.jpg", "https://play.google.com/store/apps/details?id=io.codigito.mylookexpress&hl=es").then(function () {
            console.log("shareSheetShare: Success");
        }).catch(function () {
            console.error("shareSheetShare: failed");
        });
    };
    MytabsComponent = __decorate([
        Component({
            selector: 'mytabs',
            templateUrl: 'mytabs.html'
        }),
        __metadata("design:paramtypes", [SocialSharing, Platform, App, Storage, NavController, NavParams])
    ], MytabsComponent);
    return MytabsComponent;
}());
export { MytabsComponent };
//# sourceMappingURL=mytabs.js.map