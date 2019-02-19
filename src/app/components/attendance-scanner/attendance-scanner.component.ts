import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { Result } from '@zxing/library';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-attendance-scanner',
  templateUrl: './attendance-scanner.component.html',
  styleUrls: ['./attendance-scanner.component.scss']
})
export class AttendanceScannerComponent implements OnInit {

  constructor(private eventService: EventsService) { }

  ngVersion = VERSION.full;

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;

  lastScanned = '';
  status = 'waiting';

  ngOnInit() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;

      // selects the devices's back camera by default
      // for (const device of devices) {
      //     if (/back|rear|environment/gi.test(device.label)) {
      //         this.scanner.changeDevice(device);
      //         this.currentDevice = device;
      //         break;
      //     }
      // }
    });

    this.scanner.camerasNotFound.subscribe(() => this.hasDevices = false);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  }


  displayCameras(cameras: MediaDeviceInfo[]) {
    console.log('Devices: ', cameras);
    this.availableDevices = cameras;
  }

  handleQrCodeResult(resultString: string) {
    console.log('Result: ', resultString);
    this.qrResultString = resultString;

  }

  updateAttendance() {
    if (this.qrResultString !== this.lastScanned) {
      const email = this.qrResultString.split('/')[0];
      const eventId = this.qrResultString.split('/')[1];
      this.lastScanned = email;
      this.eventService.updateUserEvent(email, eventId)
        .then(result => {
          this.status = result;
        })
        .catch(err => {
          this.status = err;
        });
    }
  }

  onDeviceSelectChange(selectedValue: string) {
    console.log('Selection changed: ', selectedValue);
    this.currentDevice = this.scanner.getDeviceById(selectedValue);
  }

  stateToEmoji(state: boolean): string {

    const states = {
      // not checked
      undefined: '❔',
      // failed to check
      null: '⭕',
      // success
      true: '✔',
      // can't touch that
      false: '❌'
    };

    return states['' + state];
  }

}
