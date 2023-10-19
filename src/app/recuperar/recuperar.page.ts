import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  formularioRecuperacion: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router
  ) {
    this.formularioRecuperacion = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  async recuperarContrasena() {
    const nombre = this.formularioRecuperacion.value.nombre;
    
    const usuario = await this.obtenerUsuarioPorNombre(nombre);

    if (usuario) {
      this.mostrarContrasena(usuario.password);
    } else {
      this.mostrarMensajeError();
    }
  }

  async mostrarContrasena(contrasena: string) {
    const alert = await this.alertController.create({
      header: 'Contraseña del Usuario',
      message: `La contraseña del usuario es: ${contrasena}`,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async mostrarMensajeError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El nombre ingresado no corresponde a un usuario válido.',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async obtenerUsuarioPorNombre(nombre: string) {
    const usuariosPreferences = await Preferences.get({ key: 'usuarios' });

    if (usuariosPreferences.value) {
      const usuarios: { nombre: string, password: string }[] = JSON.parse(usuariosPreferences.value);
      const usuarioEncontrado = usuarios.find(u => u.nombre === nombre);
      return usuarioEncontrado || null;
    }

    return null;
  }
}



