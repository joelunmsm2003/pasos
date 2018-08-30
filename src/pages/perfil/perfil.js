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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PerfilPage = /** @class */ (function () {
    function PerfilPage(server, navCtrl, _perfil, navParams) {
        var _this = this;
        this.server = server;
        this.navCtrl = navCtrl;
        this._perfil = _perfil;
        this.navParams = navParams;
        this.cliente = {};
        this.host = this.server.getMyGlobalVar();
        this._perfil.miperfil()
            .subscribe(function (data) {
            _this.email = data[0]['email'];
            _this.telefono = data[0]['telefono'];
            _this.photo = data[0]['photo'];
            _this.photo_facebook = data[0]['photo_facebook'];
            _this.user_grupo = data[0]['user__groups__name'];
            _this.nombre = data[0]['nombre'];
            _this.correo = data[0]['email'];
            _this.telefono = data[0]['telefono'];
        });
    }
    PerfilPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PerfilPage');
    };
    PerfilPage.prototype.actualiza = function (nombre, email, telefono) {
        this.cliente.nombre = nombre;
        this.cliente.email = email;
        this.cliente.telefono = telefono;
        this._perfil.actualiza(this.cliente)
            .subscribe(function (data) {
            console.log(data);
        });
    };
    PerfilPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-perfil',
            templateUrl: 'perfil.html',
            providers: [ServerProvider]
        }),
        __metadata("design:paramtypes", [ServerProvider, NavController, PerfilProvider, NavParams])
    ], PerfilPage);
    return PerfilPage;
}());
export { PerfilPage };
//# sourceMappingURL=perfil.js.map