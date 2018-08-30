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
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { SpinnerProvider } from '../../providers/spinner/spinner';
import { MapProvider } from '../../providers/map/map';
import { ReservaPage } from '../reserva/reserva';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import { RequestOptions, Headers } from '@angular/http';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AlertaPage = /** @class */ (function () {
    function AlertaPage(server, authHttp, _servicio, storage, navCtrl, geolocation, zone, platform, localStorage, mapService, spinner, viewCtrl, navParams) {
        var _this = this;
        this.server = server;
        this.authHttp = authHttp;
        this._servicio = _servicio;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.zone = zone;
        this.platform = platform;
        this.localStorage = localStorage;
        this.mapService = mapService;
        this.spinner = spinner;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.addressElement = null;
        this.address = '';
        this.reservaPage = ReservaPage;
        this.platform.ready().then(function () { return _this.loadMaps(); });
        this.host = this.server.getMyGlobalVar();
    }
    AlertaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MapPage');
        this.ubicacion = 'jsjsjsj';
    };
    AlertaPage.prototype.loadMaps = function () {
        var _this = this;
        if (!!google) {
            this.initializeMap();
            this.initAutocomplete();
        }
        else {
            this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.');
        }
        console.log('servicio..', this.navParams.get("servicio"));
        this._servicio.detalleservicio(this.navParams.get("servicio"))
            .subscribe(function (data) {
            //this.servicio=data
            return _this.iraLocation(data[0]['latitud'], data[0]['longitud']);
        }
        //console.log('ser...',data[0])
        );
        this._servicio.detalleservicio(this.navParams.get("servicio"))
            .subscribe(function (data) {
            return _this.ped = data[0]['pedidos'];
        });
        this._servicio.detalleservicio(this.navParams.get("servicio"))
            .subscribe(function (data) {
            return _this.photo_cliente = data[0]['cliente__photo'];
        });
        this._servicio.detalleservicio(this.navParams.get("servicio"))
            .subscribe(function (data) {
            return _this.nombre_cliente = data[0]['cliente__nombre'];
        });
    };
    AlertaPage.prototype.initializeMap = function () {
        var _this = this;
        var that = this;
        //that.currentLocation();
        this.zone.run(function () {
            var mapEle = _this.mapElement.nativeElement;
            _this.map = new google.maps.Map(mapEle, {
                zoom: 16,
                center: { lat: 12, lng: -12 },
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
                //that.getAddress(latLngObj);
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
    AlertaPage.prototype.initAutocomplete = function () {
        var _this = this;
        this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
        this.createAutocomplete(this.addressElement).subscribe(function (location) {
            console.log('Searchdata', location);
            var latLngObj = { 'lat': location.lat(), 'long': location.lng() };
            //this.getAddress(latLngObj);
            var options = {
                center: location,
                zoom: 16
            };
            _this.map.setOptions(options);
        });
    };
    AlertaPage.prototype.currentLocation = function () {
        var _this = this;
        this.spinner.load();
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var latLngObj = { 'lat': position.coords.latitude, 'long': position.coords.longitude };
            // Display  Marker
            _this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            //alert(latLngObj)
            //this.storage.set('ubicacion', latLngObj)
            //this.getAddress(latLngObj);
            _this.spinner.dismiss();
            localStorage.setItem('current_latlong', JSON.stringify(latLngObj));
            return latLngObj;
        }, function (err) {
            console.log(err);
        });
    };
    AlertaPage.prototype.iraLocation = function (lat, long) {
        this.spinner.load();
        console.log('ubicando...', lat, long);
        var latLng = lat;
        var latLngObj = long;
        // Display  Marker
        this.map.setCenter(new google.maps.LatLng(latLng, latLngObj));
        //alert(latLngObj)
        //this.storage.set('ubicacion', latLngObj)
        //this.getAddress(latLngObj);
        this.spinner.dismiss();
        localStorage.setItem('current_latlong', JSON.stringify(latLngObj));
        return latLngObj;
    };
    AlertaPage.prototype.getAddress = function (latLngObj) {
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
                _this.address = s_address.results[0].formatted_address;
                _this.getAddressComponentByPlace(s_address.results[0], latLngObj);
                //alert(latLngObj)
                //this.storage.set('ubicacion', latLngObj)
                //alert(this.address);
            }
        }, function (err) {
            //alert('No Address found ' + err);
        });
    };
    AlertaPage.prototype.getMapCenter = function () {
        return this.map.getCenter();
    };
    AlertaPage.prototype.createAutocomplete = function (addressEl) {
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
    AlertaPage.prototype.getAddressComponentByPlace = function (place, latLngObj) {
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
    AlertaPage.prototype.resizeMap = function () {
        var _this = this;
        setTimeout(function () {
            google.maps.event.trigger(_this.map, 'resize');
        }, 200);
    };
    AlertaPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    AlertaPage.prototype.errorAlert = function (title, message) {
        alert('Error in Alert');
    };
    AlertaPage.prototype.reserva = function (dia, hora, ubicacion) {
        console.log('hhddh', dia, hora);
        this.storage.set('dia', dia);
        this.storage.set('hora', hora);
        this.storage.set('ubicacion', ubicacion);
    };
    AlertaPage.prototype.enviaracliente = function (data) {
        var creds = JSON.stringify(data);
        var options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        this.authHttp.post(this.server.getMyGlobalVar() + 'aceptarservicio/', creds, options)
            .subscribe(function (data) {
            console.log(data);
        });
    };
    AlertaPage.prototype.aceptar = function () {
        var _this = this;
        this._servicio.detalleservicio(this.navParams.get("servicio"))
            .subscribe(function (data) {
            return _this.enviaracliente(data);
        });
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], AlertaPage.prototype, "mapElement", void 0);
    __decorate([
        ViewChild('searchbar', { read: ElementRef }),
        __metadata("design:type", ElementRef)
    ], AlertaPage.prototype, "searchbar", void 0);
    AlertaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-alerta',
            templateUrl: 'alerta.html',
            providers: [ServerProvider]
        }),
        __metadata("design:paramtypes", [ServerProvider, AuthHttp, ServiciosProvider, Storage, NavController,
            Geolocation,
            NgZone,
            Platform,
            Storage,
            MapProvider,
            SpinnerProvider,
            ViewController,
            NavParams])
    ], AlertaPage);
    return AlertaPage;
}());
export { AlertaPage };
//# sourceMappingURL=alerta.js.map