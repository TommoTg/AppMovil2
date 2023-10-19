import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, private router: Router) { 
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async ingresar() {
    const f = this.formularioLogin.value;

    const usuariosJSON = await Preferences.get({ key: 'usuarios' });
    const usuarios: { nombre: string, password: string }[] = usuariosJSON && usuariosJSON.value ? JSON.parse(usuariosJSON.value) : [];

    const usuario = usuarios.find(u => u.nombre === f.nombre && u.password === f.password);

    if (usuario) {
      await Preferences.set({ key: 'nombreUsuario', value: usuario.nombre });
      await Preferences.set({ key: 'usuario', value: JSON.stringify(usuario) });

      this.router.navigate(['/home']);
      console.log("Sesión iniciada");
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste no son correctos',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }
}