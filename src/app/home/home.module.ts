import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { DatePipe } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ZXingScannerModule
  ],
  declarations: [HomePage],


  providers: [
    DatePipe, // Agrega DatePipe aquí
  ],
})
export class HomePageModule {}
