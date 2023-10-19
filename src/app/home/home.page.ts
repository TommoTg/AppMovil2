import { Component, AfterViewInit, ViewChild, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result, BarcodeFormat } from '@zxing/library';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements AfterViewInit {
  nombreUsuario: string = '';
  rut: string = '';
  apellido: string = '';
  qrData!: any;
  ngVersion = VERSION.full;

  @ViewChild('scanner', { static: false }) scanner!: ZXingScannerComponent;

  hasDevices = false;
  hasPermission = false;
  qrResultString = '';
  qrResult: Result | null = null;
  availableDevices: MediaDeviceInfo[] = [];

  currentDevice: MediaDeviceInfo | undefined = {
    kind: 'videoinput',
    label: 'Iriun Webcam', // Cambia esto al nombre correcto de la cámara virtual
    deviceId: 'virtual-camera-id',
    groupId: 'virtual-group-id',
    toJSON: () => ({
      kind: 'videoinput',
      label: 'Iriun Webcam',
      deviceId: 'virtual-camera-id',
      groupId: 'virtual-group-id',
    }),
  };
  formats: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe 
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params['user']) {
        this.nombreUsuario = JSON.parse(params['user']).usuario;
        this.rut = JSON.parse(params['user']).rut || '';
        this.apellido = JSON.parse(params['user']).apellido || '';
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;

      // Selects the device's back camera by default
      for (const device of devices) {
        if (/back|rear|environment/gi.test(device.label)) {
          this.currentDevice = device;
          break;
        }
      }
    });

    this.scanner.camerasNotFound.subscribe(() => (this.hasDevices = false));
    this.scanner.scanComplete.subscribe((result: Result) => {
      this.qrResult = result;
      this.handleQrCodeResult(result?.getText());
    });
    this.scanner.permissionResponse.subscribe(
      (perm: boolean) => (this.hasPermission = perm)
    );
  }

  handleQrCodeResult(resultString: string | null) {
    if (resultString) {
      // Supongamos que el contenido del QR tiene el formato "Nombre Profesor: Pepito Juan, Hora: 20:30, sala: 805, Dia: lunes"
      const qrDataArray = resultString.split(', ');
      const qrDataObject: { [key: string]: string } = {};


      qrDataArray.forEach((item) => {
        const [key, value] = item.split(': ');
        qrDataObject[key] = value;
      });

      const horaActual = this.datePipe.transform(new Date(), 'HH:mm') || '';

      // Ahora tienes un objeto JSON válido en qrDataObject
      console.log('Objeto JSON generado:', qrDataObject);
      qrDataObject['Hora Actual'] = horaActual;


      // Puedes acceder a los valores individuales
      const nombreProfesor = qrDataObject['Nombre Profesor'];
      const hora = qrDataObject['Hora'];
      const sala = qrDataObject['sala'];
      const dia = qrDataObject['Dia'];
      

      // Realiza las acciones necesarias con estos datos

      // Finalmente, navega a la página "lista" y pasa los datos si es necesario
      this.router.navigate(['/lista'], {
        state: {
          qrData: qrDataObject,
          nombreUsuario: this.nombreUsuario,
          rut: this.rut,
          horaActual: horaActual,
        },
      });
    }
  }
}




