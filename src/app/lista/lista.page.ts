import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  qrData: any;
  usuarios: any[] = [];
  horaActual: string = '';

  constructor() {
    // Accede a los datos del estado de navegación
    const navigation = window.history.state;
    if (navigation && navigation.qrData) {
      this.qrData = navigation.qrData;
    }

    this.horaActual = new Date().toLocaleTimeString();
  }

  async ngOnInit() {
    // Recuperar el mensaje de localStorage
    const mensajeLocalStorage = localStorage.getItem('mensaje');

    // Obtén los datos almacenados en Capacitor Preferences
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
        // La imagen se capturó con éxito, puedes mostrarla o realizar otras acciones
        console.log('Imagen capturada:', image.webPath);
      } else {
        console.log('No se capturó ninguna imagen o la imagen es nula.');
      }
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }
}