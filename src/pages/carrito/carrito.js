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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CategoriasProvider } from '../../providers/categorias/categorias';
/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CarritoPage = /** @class */ (function () {
    function CarritoPage(dataService, storage, view, navCtrl, navParams) {
        var _this = this;
        this.dataService = dataService;
        this.storage = storage;
        this.view = view;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        console.log('pddiodod', this.pedido);
        this.storage.get('pedido').then(function (val) {
            _this.pedido = val;
        });
    }
    CarritoPage.prototype.closeModal = function () {
        this.storage.set('pedido', this.pedido);
        console.log('cerrando..');
        this.view.dismiss();
    };
    CarritoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad CarritoPage');
        this.pedido = this.navParams.get('pedido');
        this.mano = this.navParams.get('mano');
        this.pies = this.navParams.get('pies');
        this.maquillaje = this.navParams.get('maquillaje');
        this.podologia = this.navParams.get('podologia');
        this.masajes = this.navParams.get('masajes');
        this.manicureninas = this.navParams.get('manicureninas');
        this.baber = this.navParams.get('baber');
        this.extras = this.navParams.get('extras');
        this.cabello = this.navParams.get('cabello');
        this.promociones = this.navParams.get('promociones');
        console.log('mano....', this.mano);
        this.mano[0].descripcion = 'jsjjsjsj';
        this.storage.get('pedido').then(function (val) {
            _this.pedido = val;
            console.log('pedido...', _this.pedido);
        });
    };
    CarritoPage.prototype.quitacarrito = function (data) {
        if (data.categoria__nombre == 'Promociones') {
            this.dataService.filterItems(this.promociones, data.descripcion);
        }
        if (data.categoria__nombre == 'Cabello') {
            this.dataService.filterItems(this.cabello, data.descripcion);
        }
        if (data.categoria__nombre == 'Cosmiatria') {
            this.dataService.filterItems(this.mano, data.descripcion);
        }
        if (data.categoria__nombre == 'Hombres') {
            this.dataService.filterItems(this.baber, data.descripcion);
        }
        if (data.categoria__nombre == 'Masajes') {
            this.dataService.filterItems(this.masajes, data.descripcion);
        }
        if (data.categoria__nombre == 'Podologia') {
            this.dataService.filterItems(this.podologia, data.descripcion);
        }
        if (data.categoria__nombre == 'Maquillaje') {
            this.dataService.filterItems(this.maquillaje, data.descripcion);
        }
        if (data.categoria__nombre == 'Uñas') {
            console.log(this.mano);
            console.log('uñas..', this.dataService.filterItems(this.mano, data.descripcion));
            this.mano[this.mano.indexOf(this.dataService.filterItems(this.mano, data.descripcion)[0])].check = false;
        }
        var index = this.pedido.indexOf(data);
        if (index !== -1) {
            this.pedido.splice(index, 1);
        }
    };
    CarritoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-carrito',
            templateUrl: 'carrito.html',
            providers: [CategoriasProvider]
        }),
        __metadata("design:paramtypes", [CategoriasProvider, Storage, ViewController, NavController, NavParams])
    ], CarritoPage);
    return CarritoPage;
}());
export { CarritoPage };
//# sourceMappingURL=carrito.js.map