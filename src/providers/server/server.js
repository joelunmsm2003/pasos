var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ServerProvider = /** @class */ (function () {
    function ServerProvider() {
        this.myGlobalVar = "https://mylookxpressapp.com:2500/";
    }
    ServerProvider.prototype.setMyGlobalVar = function (value) {
        this.myGlobalVar = value;
    };
    ServerProvider.prototype.getMyGlobalVar = function () {
        return this.myGlobalVar;
    };
    ServerProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], ServerProvider);
    return ServerProvider;
}());
export { ServerProvider };
//# sourceMappingURL=server.js.map