import {Component, Input, OnInit} from '@angular/core';
import {Device} from '../../../model/device';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Localendpoint} from '../../../global/envVar';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit {

  submitted = false;
  @Input() device: Device = {};
  listOS : string[]= ['Android','ios','Symbian','Win Mobile'];
  rate: number[] =[1,2,3,4,5,6,7,8,9,10];

  selectedRadio: string;
  constructor(public httpClient: HttpClient) {
    this.getById(3);
  }
  ngOnInit() {
  }

  getById(id) {
    this.httpClient.get<Device>('http://localhost:3000/devices/'+id)
      .subscribe(result => {
        console.log(result);
        this.device = result;
        this.selectedRadio = ''+result.rate;
      });
  }

  onSubmit() { this.submitted = true; }

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(heroForm)}}
  showFormControls(form: any) {
    return form && form.controls['label'] &&
      form.controls['label'].value; // Dr. IQ
  }

  add(deviceForm: NgForm) {
    if(!!this.device.id){
      this.httpClient.put(Localendpoint+this.device.id,this.device).subscribe(response => {
        console.log(response);
      });
    }else {
      this.httpClient.post<Device>(`http://localhost:3000/devices`, this.device)
        .subscribe(res => {
        });
    }
  }

  newDevice(){
    this.device = {};
  }

  logForm(form){
    console.log("log form",form);
  }

}
