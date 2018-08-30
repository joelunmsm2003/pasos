
import * as Raven from 'raven-js';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,NavController } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { ReservaPage } from '../pages/reserva/reserva';
import { VentaPage } from '../pages/venta/venta';

import { IntroPage } from '../pages/intro/intro';
import { AlertaPage } from '../pages/alerta/alerta';

import { PagoPage } from '../pages/pago/pago';

import { MenPage } from '../pages/men/men';

import { UbicacionPage } from '../pages/ubicacion/ubicacion';
import { LoginPage } from '../pages/login/login';
import { ServicioPage } from '../pages/servicio/servicio';
import { TabsPage } from '../pages/tabs/tabs';
import { RegistroPage } from '../pages/registro/registro';
import { DetalleservicioPage } from '../pages/detalleservicio/detalleservicio';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { SociasPage } from '../pages/socias/socias';

import { FinalizaservicioPage } from '../pages/finalizaservicio/finalizaservicio';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CompartirPage } from '../pages/compartir/compartir';
import { AvisoPage } from '../pages/aviso/aviso';
import { PerfilPage } from '../pages/perfil/perfil';
import { NotificacionPage } from '../pages/notificacion/notificacion';
import { CarritoPage } from '../pages/carrito/carrito';
import { HistorialPage } from '../pages/historial/historial';
import { HistorialsociaPage } from '../pages/historialsocia/historialsocia';
import { InicioPage } from '../pages/inicio/inicio';
import { RegistrofinalPage } from '../pages/registrofinal/registrofinal';
import { RegistroprincipalPage } from '../pages/registroprincipal/registroprincipal';
import { LoginprincipalPage } from '../pages/loginprincipal/loginprincipal';
import { DetalleproductoPage } from '../pages/detalleproducto/detalleproducto';
import { SearchPage } from '../pages/search/search';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CategoriasComponent } from '../components/categorias/categorias';
import { MytabsComponent } from '../components/mytabs/mytabs';
import { MytabsnologinComponent } from '../components/mytabsnologin/mytabsnologin';
import { MytabssociaComponent } from '../components/mytabssocia/mytabssocia';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { Storage } from '@ionic/storage';
import {IonicStorageModule} from '@ionic/storage';
import { HttpClientModule,HttpClient } from '@angular/common/http'; 

import { GoogleMaps } from '@ionic-native/google-maps';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { Facebook } from '@ionic-native/facebook';
import { MapProvider } from '../providers/map/map';
import { SpinnerProvider } from '../providers/spinner/spinner';
import { ServiciosProvider } from '../providers/servicios/servicios';
import { PerfilProvider } from '../providers/perfil/perfil';
import { OneSignal } from '@ionic-native/onesignal';
import { Clipboard } from '@ionic-native/clipboard';
import { ServicioProvider } from '../providers/servicio/servicio';
import { NotificacionProvider } from '../providers/notificacion/notificacion';
import { Device } from '@ionic-native/device';
import { ServerProvider } from '../providers/server/server';

import { Http, RequestOptions, HttpModule } from '@angular/http';
import { DataProvider } from '../providers/data/data';

//import { FilterPipe} from '../pipes/filter/filter';





Raven
  .config('https://bd20e17ba38a4b2c9dc8333a170e1ad2@sentry.io/1230751')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err);
  }
}


//import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
//import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
 

// let config = new AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider("466431784640-objf8bhgbkmuvdu0s5i8f0551jif125h.apps.googleusercontent.com")
//   },
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider("180799656092340")
//   }
// ]);


// export function provideConfig() {
//   return config;
// }



let storage = new Storage({});

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('token').then((token: string) => token)),
  }), http);
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetalleservicioPage,
    ReservaPage,
    VentaPage,
    IntroPage,
    HistorialPage,
    LoginprincipalPage,
    NotificacionPage,
    DetalleproductoPage,
    LoginPage,
    ServicioPage,
    MenPage,
    PerfilPage,
    CompartirPage,
    RegistroprincipalPage,
    RegistrofinalPage,
    SociasPage,
    SearchPage,
    AlertaPage,
    FinalizaservicioPage,
    TabsPage,
    AvisoPage,
    AyudaPage,
    PagoPage,
    InicioPage,
    CarritoPage,
    HistorialsociaPage,
    UbicacionPage,
    RegistroPage,
    CategoriasComponent,
    MytabsComponent,
    MytabssociaComponent,
    MytabsnologinComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      monthNames: ['janeiro', 'fevereiro', 'mar\u00e7o','abril','mayo','junio','julio','agosto','setiembre','octubre','noviembre','diciembre' ],
      monthShortNames: ['jan', 'fev', 'mar','abr','mayo','juni','jul','Ago','Set','Oct','Nov','Dic' ],
      dayNames: ['Domingo', 'Lunes', 'Martes','Miercoles','Jueves','Viernes','Sabado'],
      dayShortNames: ['Dom', 'Lun', 'Mar','Mie','Jue','Vie','Sab' ],
    })
    //SocialLoginModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReservaPage,
    VentaPage,
    AlertaPage,
    DetalleservicioPage,
    HistorialPage,
    FinalizaservicioPage,
    LoginPage,
    UbicacionPage,
    DetalleproductoPage,
    CompartirPage,
    IntroPage,
    ServicioPage,
    LoginprincipalPage,
    InicioPage,
    SociasPage,
    RegistrofinalPage,
    AvisoPage,
    RegistroprincipalPage,
    PagoPage,
    NotificacionPage,
    RegistroPage,
    TabsPage,
    MenPage,
    PerfilPage,
    SearchPage,
    HistorialsociaPage,
    CompartirPage,
    AyudaPage,
    CarritoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    Device,
    // {
    //   provide: AuthServiceConfig,
    //   useFactory: provideConfig
    // },
    SocialSharing,
    OneSignal,
    Clipboard,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    //{ provide: ErrorHandler, useClass: RavenErrorHandler },
    CategoriasProvider,
    Facebook,
    MapProvider,
    SpinnerProvider,
    ServiciosProvider,
    PerfilProvider,
    ServicioProvider,
    NotificacionProvider,
    ServerProvider,

  ]
})
export class AppModule {}
