import {Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Localendpoint} from '../../../global/envVar';
import {Device} from '../../../model/device';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit{

  listOS: string[] = ['Android', 'iOS', 'Symbian', 'Win Mobile'];
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
    this.myForm = formBuilder.group({
        'nome': ['', Validators.required],
        'price': ['', Validators.required],
        'os': ['android', Validators.required],
        'rate': ['2', Validators.required],
        'description': ['',
          Validators.compose([Validators.maxLength(150), Validators.minLength(10)])]
      }
    );

  }

  ngOnInit() {
    this.getRandomDevice();
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 10);
  }

  getRandomDevice() {
    let randomId = this.getRandomNumber();
    this.httpClient.get<Device>(Localendpoint + randomId).subscribe(result => {
      this.myForm.setControl('nome', new FormControl(result.label));
      this.myForm.setControl('price', new FormControl(result.price));
      this.myForm.setControl('os', new FormControl(result.os));
      this.myForm.setControl('rate', new FormControl(''+result.rate));
      this.myForm.setControl('description', new FormControl(result.desc));
    }, error => {
      if (error.status == 404) {
        this.getRandomDevice();
      }
    });

  }

  addDevice(form){
    let device : Device = {
    label: form.nome,
    os: form.os,
    price: form.price,
    rate: form.rate,
    desc: form.description
    };
    this.httpClient.post(Localendpoint,device).subscribe(response =>{
    console.log(response)
    },error => {
      console.log(error);
    });
  }

  logMyForm(){
    console.log(this.myForm);
  }
}
