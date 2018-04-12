import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { FormBuilder , FormGroup , Validators , AbstractControl } from '@angular/forms';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map'


@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  public registrationForm:FormGroup;

  //constructer starts
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formbuilder:FormBuilder,
    private http:Http  ) {

        this.registrationForm = this.formbuilder.group({
          phone:['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
          email:['',Validators.compose([Validators.required,Validators.email,Validators.maxLength(50)])],
          name:['',Validators.compose([Validators.required,Validators.maxLength(50)])],
          gender:['',Validators.required],
          dob:['',Validators.required],
          address:['',Validators.required],
          password:['',Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(20)])]
         });
      }
  //constructer ends

  //registration function
  register(){
    //console.log(this.registrationForm.controls['email'].value);
    var dummyuser = {
      phone:this.registrationForm.controls['phone'].value,
      email:this.registrationForm.controls['email'].value,
      password:this.registrationForm.controls['password'].value,
      name:this.registrationForm.controls['name'].value,
      gender:this.registrationForm.controls['gender'].value,
      dob:this.registrationForm.controls['dob'].value
    }

    console.log(JSON.stringify(dummyuser));
    var data = JSON.stringify(dummyuser);

    this.signup(data);
    

  }



  
 //Api call for registratin function
  signup(data){
    let headers = new Headers();
    headers.append('Content-Type','application/json'); 

    //Api call for registratin
    this.http.post('http://localhost:8200/registeruser/',data,{headers:headers})
    .map(res=>res.json())
    .subscribe(data=>{
      console.log(data);
    });
  }
 








  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

}
