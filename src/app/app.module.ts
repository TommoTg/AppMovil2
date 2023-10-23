import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';


import { HomePageModule } from './home/home.module';
import { FormsModule } from '@angular/forms';



import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule }  from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http'

import { AlertController } from '@ionic/angular';

import { AuthGuard } from './services/auth.guard';


@NgModule({
  declarations: [AppComponent],
  imports:
   [  BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      CommonModule,
      HomePageModule,
      FormsModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      HttpClientModule,
      
    ],
  providers: [AuthGuard, AlertController,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
