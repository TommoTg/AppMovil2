import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  qrData: any;
  usuarios: any[] = [];
  horaActual: string = '';
  latitude: string = ''; 
  longitude: string = '';
  imageSrc: string = ''


  constructor() {
    // Accede a los datos del estado de navegación
    const navigation = window.history.state;
    if (navigation && navigation.qrData) {
      this.qrData = navigation.qrData;
    }

    this.horaActual = new Date().toLocaleTimeString();
    this.getLocation(); 
  }

  async ngOnInit() {
    // Recuperar el mensaje de localStorage
    const mensajeLocalStorage = localStorage.getItem('mensaje');

    
    const usuariosPreferences = await Preferences.get({ key: 'usuarios' });

    if (usuariosPreferences.value) {
      this.usuarios = JSON.parse(usuariosPreferences.value);
    }
  }

  async abrirCamara() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });

      if (image && image.webPath) {
        this.imageSrc = image.webPath;
        
        console.log('Imagen capturada:', image.webPath);
      } else {
        console.log('No se capturó ninguna imagen o la imagen es nula.');
      }
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }


  convertToDMM(degrees: number) {
    const absoluteDegrees = Math.abs(degrees);
    const integerPart = Math.floor(absoluteDegrees);
    const minutes = (absoluteDegrees - integerPart) * 60;
    const formattedDMM = integerPart + minutes / 100;
    return degrees >= 0 ? formattedDMM : -formattedDMM;
  }
  
  async getLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Coordenadas obtenidas:', coordinates);
      this.latitude = this.convertToDMM(coordinates.coords.latitude).toString();
      this.longitude = this.convertToDMM(coordinates.coords.longitude).toString();
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }



}