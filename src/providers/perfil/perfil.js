var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { AuthHttp } from 'angular2-jwt';
import { ServerProvider } from '../../providers/server/server';
/*
  Generated class for the PerfilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PerfilProvider = /** @class */ (function () {
    function PerfilProvider(authHttp, _http, server) {
        this.authHttp = authHttp;
        this._http = _http;
        this.server = server;
        console.log('Hello PerfilProvider Provider');
    }
    PerfilProvider.prototype.miperfil = function () {
        return this.authHttp.get(this.server.getMyGlobalVar() + 'miperfil/')
            .map(function (response) { return response.json(); });
    };
    PerfilProvider.prototype.getperfil = function () {
        return this.authHttp.get(this.server.getMyGlobalVar() + 'miperfil/').map(function (res) {
            return res.json();
        });
    };
    PerfilProvider.prototype.actualiza = function (data) {
        return this.authHttp.post(this.server.getMyGlobalVar() + 'actualizaperfil/', JSON.stringify({ cliente: data }))
            .map(function (response) {
            return response.json();
        });
    };
    PerfilProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthHttp, HttpClient, ServerProvider])
    ], PerfilProvider);
    return PerfilProvider;
}());
export { PerfilProvider };
//# sourceMappingURL=perfil.js.map