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
import { App, NavController, NavParams } from 'ionic-angular';
import { LoginprincipalPage } from '../../pages/loginprincipal/loginprincipal';
import { ServicioPage } from '../../pages/servicio/servicio';
import { AyudaPage } from '../../pages/ayuda/ayuda';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NotificacionProvider } from '../../providers/notificacion/notificacion';
/**
 * Generated class for the MytabsnologinComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var MytabsnologinComponent = /** @class */ (function () {
    function MytabsnologinComponent(_notificacion, appCtrl, storage, navCtrl, navParams, socialSharing) {
        var _this = this;
        this._notificacion = _notificacion;
        this.appCtrl = appCtrl;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socialSharing = socialSharing;
        this.myVar = true;
        this.servicioPage = ServicioPage;
        this.ayudaPage = AyudaPage;
        this.loginprincipalPage = LoginprincipalPage;
        this.storage.get('token').then(function (val) {
            console.log('Token....', val);
            _this.logeado = val;
            if (_this.logeado == null) {
                _this.nologeado = true;
            }
            if (_this.logeado) {
                _this.logeado = true;
            }
        });
    }
    MytabsnologinComponent.prototype.loginprincipal = function () {
        console.log('queeeee');
        this.navCtrl.push(LoginprincipalPage);
    };
    MytabsnologinComponent.prototype.shareSheetShare = function () {
        this.socialSharing.share("Registrate", "Atreveteeetee sal del closeet", "https://st2.depositphotos.com/5328332/12205/v/950/depositphotos_122057578-stock-illustration-express-delivery-of-fashion-and.jpg", "https://play.google.com/store/apps/details?id=io.codigito.mylookexpress&hl=es").then(function () {
            console.log("shareSheetShare: Success");
        }).catch(function () {
            console.error("shareSheetShare: failed");
        });
    };
    MytabsnologinComponent = __decorate([
        Component({
            selector: 'mytabsnologin',
            templateUrl: 'mytabsnologin.html',
            providers: [NotificacionProvider]
        }),
        __metadata("design:paramtypes", [NotificacionProvider, App, Storage, NavController, NavParams, SocialSharing])
    ], MytabsnologinComponent);
    return MytabsnologinComponent;
}());
export { MytabsnologinComponent };
//# sourceMappingURL=mytabsnologin.js.map