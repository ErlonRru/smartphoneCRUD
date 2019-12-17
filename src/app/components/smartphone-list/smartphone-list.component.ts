import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Device} from '../../model/device';
import {NgForm} from '@angular/forms';

const INITIAL_STATE = { label: null, os: null };

@Component({
  selector: 'app-smartphone-list',
  templateUrl: './smartphone-list.component.html',
  styleUrls: ['./smartphone-list.component.scss']
})
export class SmartphoneListComponent implements OnInit {

  active: Device = INITIAL_STATE;
  devices: Device[];

  constructor(private http: HttpClient) {
    this.getAll();
  }

  ngOnInit() {

  }
  setActive(device: Device) {
    this.active = device;
  }

  getAll() {
    this.http.get<Device[]>('http://localhost:3000/devices')
      .subscribe(result => {
        this.devices = result;
      });
  }

  delete(event: MouseEvent, device: Device) {
    this.http.delete<any>(`http://localhost:3000/devices/${device.id}`)
      .subscribe(
        () => {
          const index = this.devices.indexOf(device)
          this.devices.splice(index, 1);
        }
      );
  }

  save(form: NgForm) {
    if (this.active.id) {
      this.edit(form.value);
    } else {
      this.add(form.value);
      form.reset();
    }
  }

  add(device: Device) {
    this.http.post<Device>(`http://localhost:3000/devices`, device)
      .subscribe(res => {
        this.devices.push(res)
        this.reset();
      })
  }

  edit(device: Device) {
    const newDevice = Object.assign(
      {},
      this.active,
      device
    );

    this.http.patch<Device>(`http://localhost:3000/devices/${newDevice.id}`, newDevice )
      .subscribe(
        res => {
          const index = this.devices.findIndex(device => device.id === newDevice.id) ;
          this.devices[index] = newDevice;
        }
      );

  }

  reset() {
    this.active = INITIAL_STATE;
  }

}
