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
import { NavController, NavParams, Platform } from 'ionic-angular';
import { IntroPage } from '../../pages/intro/intro';
import { PerfilPage } from '../../pages/perfil/perfil';
import { LoginPage } from '../../pages/login/login';
import { ServicioPage } from '../../pages/servicio/servicio';
import { HistorialPage } from '../../pages/historial/historial';
import { HistorialsociaPage } from '../../pages/historialsocia/historialsocia';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MytabsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var MytabssociaComponent = /** @class */ (function () {
    function MytabssociaComponent(platform, storage, navCtrl, navParams) {
        this.platform = platform;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.myVar = true;
        this.perfilPage = PerfilPage;
        this.introPage = IntroPage;
        this.servicioPage = ServicioPage;
        this.historialPage = HistorialPage;
        this.historialsociaPage = HistorialsociaPage;
        this.loginPage = LoginPage;
    }
    MytabssociaComponent.prototype.salir = function () {
        this.storage.remove('token');
        this.storage.remove('grupo');
        this.navCtrl.push(IntroPage);
        this.platform.exitApp();
    };
    MytabssociaComponent = __decorate([
        Component({
            selector: 'mytabssocia',
            templateUrl: 'mytabssocia.html'
        }),
        __metadata("design:paramtypes", [Platform, Storage, NavController, NavParams])
    ], MytabssociaComponent);
    return MytabssociaComponent;
}());
export { MytabssociaComponent };
//# sourceMappingURL=mytabssocia.js.map