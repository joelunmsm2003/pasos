var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController, Platform, AlertController, App, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { SpinnerProvider } from '../../providers/spinner/spinner';
import { MapProvider } from '../../providers/map/map';
import { ReservaPage } from '../reserva/reserva';
import { RegistroPage } from '../../pages/registro/registro';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UbicacionPage = /** @class */ (function () {
    function UbicacionPage(server, storage, navCtrl, geolocation, zone, platform, localStorage, mapService, spinner, viewCtrl, alertCtrl, appCtrl, http, navParams, toastCtrl, modalCtrl) {
        var _this = this;
        this.server = server;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.zone = zone;
        this.platform = platform;
        this.localStorage = localStorage;
        this.mapService = mapService;
        this.spinner = spinner;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.appCtrl = appCtrl;
        this.http = http;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.addressElement = null;
        this.address = '';
        this.reservaPage = ReservaPage;
        this.platform.ready().then(function () { return _this.loadMaps(); });
        this.today = new Date();
        this.anio = String(this.today).split(" ")[3];
        this.mes = String(this.today).split(" ")[1];
        this.dia = String(this.today).split(" ")[2];
        if (this.mes == 'Feb') {
            this.mes = '02';
        }
        if (this.mes == 'Mar') {
            this.mes = '03';
        }
        if (this.mes == 'Apr') {
            this.mes = '04';
        }
        if (this.mes == 'May') {
            this.mes = '05';
        }
        if (this.mes == 'Jun') {
            this.mes = '06';
        }
        if (this.mes == 'Jul') {
            this.mes = '07';
        }
        if (this.mes == 'Aug') {
            this.mes = '08';
        }
        if (this.mes == 'Set') {
            this.mes = '09';
        }
        if (this.mes == 'Oct') {
            this.mes = '10';
        }
        if (this.mes == 'Nov') {
            this.mes = '11';
        }
        if (this.mes == 'Dic') {
            this.mes = '12';
        }
        this.today = this.anio + '-' + this.mes + '-' + this.dia;
    }
    UbicacionPage.prototype.showAlert = function (data) {
        console.log(data);
        var alert = this.alertCtrl.create({
            title: 'My Look Xpress',
            subTitle: 'Porfavor ingrese ' + data,
            buttons: ['OK']
        });
        alert.present();
    };
    UbicacionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MapPage');
        this.ubicacion = 'jsjsjsj';
    };
    UbicacionPage.prototype.agregatoast = function () {
        var toast = this.toastCtrl.create({
            message: 'Arrastra el mapa para indicarnos donde te encuentras',
            duration: 4000
        });
        toast.present();
    };
    UbicacionPage.prototype.cargandomapa = function () {
        var toast = this.toastCtrl.create({
            message: 'Estamos localizandote para llegar hacia ti',
            duration: 4000
        });
        toast.present();
    };
    UbicacionPage.prototype.loadMaps = function () {
        if (!!google) {
            this.initializeMap();
            this.initAutocomplete();
        }
        else {
            this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.');
        }
    };
    UbicacionPage.prototype.initializeMap = function () {
        var _this = this;
        var that = this;
        that.currentLocation();
        this.zone.run(function () {
            var mapEle = _this.mapElement.nativeElement;
            _this.map = new google.maps.Map(mapEle, {
                zoom: 16,
                center: { lat: -12.971599, lng: -77.594563 },
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
                disableDoubleClickZoom: false,
                disableDefaultUI: true,
                zoomControl: false,
                scaleControl: true,
            });
            // Map drag started
            _this.map.addListener('dragstart', function () {
                console.log('Drag start');
            });
            // Map dragging
            _this.map.addListener('drag', function () {
                that.address = 'Searching...';
            });
            //Reload markers every time the map moves
            _this.map.addListener('dragend', function () {
                var map_center = that.getMapCenter();
                var latLngObj = { 'lat': map_center.lat(), 'long': map_center.lng() };
                that.ubicacion = latLngObj;
                that.getAddress(latLngObj);
            });
            google.maps.event.addListenerOnce(_this.map, 'idle', function () {
                google.maps.event.trigger(_this.map, 'resize');
                mapEle.classList.add('show-map');
            });
            google.maps.event.addListener(_this.map, 'bounds_changed', function () {
                _this.zone.run(function () {
                    _this.resizeMap();
                });
            });
        });
    };
    UbicacionPage.prototype.initAutocomplete = function () {
        var _this = this;
        this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
        this.createAutocomplete(this.addressElement).subscribe(function (location) {
            console.log('Searchdata', location);
            var latLngObj = { 'lat': location.lat(), 'long': location.lng() };
            _this.getAddress(latLngObj);
            _this.ubicacion = latLngObj;
            var options = {
                center: location,
                zoom: 16
            };
            _this.map.setOptions(options);
        });
    };
    UbicacionPage.prototype.currentLocation = function () {
        //this.spinner.load();
        var _this = this;
        this.cargandomapa();
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var latLngObj = { 'lat': position.coords.latitude, 'long': position.coords.longitude };
            // Display  Marker
            _this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            //alert(latLngObj)
            //this.storage.set('ubicacion', latLngObj)
            _this.storage.get('distrito').then(function (val) {
                console.log('actual distrito', val);
                console.log('return...', _this.sacaactualdistrito(val));
            });
            _this.ubicacion = latLngObj;
            _this.getAddress(latLngObj);
            //this.spinner.dismiss();
            _this.agregatoast();
            localStorage.setItem('current_latlong', JSON.stringify(latLngObj));
            return latLngObj;
        }, function (err) {
            console.log(err);
        });
    };
    UbicacionPage.prototype.getAddress = function (latLngObj) {
        var _this = this;
        // Get the address object based on latLngObj
        this.mapService.getStreetAddress(latLngObj).subscribe(function (s_address) {
            if (s_address.status == "ZERO_RESULTS") {
                _this.mapService.getAddress(latLngObj).subscribe(function (address) {
                    _this.address = address.results[0].formatted_address;
                    _this.getAddressComponentByPlace(address.results[0], latLngObj);
                }, function (err) { return console.log("Error in getting the street address " + err); });
            }
            else {
                console.log('ingrese.....', s_address);
                _this.address = s_address.results[0].formatted_address;
                _this.referencia = s_address.results[0].formatted_address;
                _this.getAddressComponentByPlace(s_address.results[0], latLngObj);
                //alert(latLngObj)
                //this.storage.set('ubicacion', latLngObj)
                //alert(this.address);
            }
        }, function (err) {
            //alert('No Address found ' + err);
        });
    };
    UbicacionPage.prototype.getMapCenter = function () {
        return this.map.getCenter();
    };
    UbicacionPage.prototype.createAutocomplete = function (addressEl) {
        var autocomplete = new google.maps.places.Autocomplete(addressEl);
        autocomplete.bindTo('bounds', this.map);
        return new Observable(function (sub) {
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    sub.error({
                        message: 'Autocomplete returned place with no geometry'
                    });
                }
                else {
                    var latLngObj = { 'lat': place.geometry.location.lat(), 'long': place.geometry.location.lng() };
                    //this.getAddress(latLngObj);
                    sub.next(place.geometry.location);
                }
            });
        });
    };
    UbicacionPage.prototype.getAddressComponentByPlace = function (place, latLngObj) {
        var components;
        components = {};
        for (var i = 0; i < place.address_components.length; i++) {
            var ac = place.address_components[i];
            components[ac.types[0]] = ac.long_name;
        }
        var addressObj = {
            street: (components.street_number) ? components.street_number : 'not found',
            area: components.route,
            city: (components.sublocality_level_1) ? components.sublocality_level_1 : components.locality,
            country: (components.administrative_area_level_1) ? components.administrative_area_level_1 : components.political,
            postCode: components.postal_code,
            loc: [latLngObj.long, latLngObj.lat],
            address: this.address
        };
        localStorage.clear();
        localStorage.setItem('carryr_customer', JSON.stringify(addressObj));
        return components;
    };
    UbicacionPage.prototype.resizeMap = function () {
        var _this = this;
        setTimeout(function () {
            google.maps.event.trigger(_this.map, 'resize');
        }, 200);
    };
    UbicacionPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    UbicacionPage.prototype.errorAlert = function (title, message) {
        alert('Error in Alert');
    };
    UbicacionPage.prototype.reserva = function (dia, hora, ubicacion, referencia) {
        var _this = this;
        console.log('hhddh', dia, hora);
        if (!hora) {
            this.showAlert('la hora');
        }
        if (!dia) {
            this.showAlert('el dia');
        }
        if (!referencia) {
            this.showAlert('una direccion');
        }
        if (dia && hora && referencia) {
            this.storage.set('dia', dia);
            this.storage.set('hora', hora);
            this.storage.set('ubicacion', ubicacion);
            this.storage.set('referencia', referencia);
            ///Registra///
            this.storage.get('token').then(function (val) {
                console.log('token', val);
                if (val == null) {
                    console.log('nullll');
                    _this.presentProfileModal();
                    _this.spinner.dismiss();
                }
                else {
                    _this.appCtrl.getRootNav().push(ReservaPage);
                }
            });
        }
    };
    UbicacionPage.prototype.presentProfileModal = function () {
        var profileModal = this.modalCtrl.create(RegistroPage, { userId: 8675309 });
        profileModal.present();
    };
    UbicacionPage.prototype.sacaactualdistrito = function (ubicacion) {
        var _this = this;
        var creds = JSON.stringify({ ubicacion: ubicacion });
        var options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        this.http.post(this.server.getMyGlobalVar() + 'infodistrito/', creds, options)
            .subscribe(function (data) {
            _this.lat = JSON.parse(data['_body'])[0]['latitud'];
            _this.lon = JSON.parse(data['_body'])[0]['longitud'];
        });
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], UbicacionPage.prototype, "mapElement", void 0);
    __decorate([
        ViewChild('searchbar', { read: ElementRef }),
        __metadata("design:type", ElementRef)
    ], UbicacionPage.prototype, "searchbar", void 0);
    UbicacionPage = __decorate([
        Component({
            selector: 'page-ubicacion',
            templateUrl: 'ubicacion.html',
        }),
        __metadata("design:paramtypes", [ServerProvider, Storage, NavController,
            Geolocation,
            NgZone,
            Platform,
            Storage,
            MapProvider,
            SpinnerProvider,
            ViewController,
            AlertController,
            App,
            Http,
            NavParams, ToastController, ModalController])
    ], UbicacionPage);
    return UbicacionPage;
}());
export { UbicacionPage };
//# sourceMappingURL=ubicacion.js.map