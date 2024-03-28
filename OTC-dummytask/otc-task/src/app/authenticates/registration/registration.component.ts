import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { matchpassword } from './passowrd.validator';
import { DataService } from 'src/app/services/data.service';
import { HttpService} from 'src/app/services/http/http.service'
import { ApiMethod, AuthEndPoints } from 'src/app/constant/api-constant';
import { Observable, forkJoin } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
  registerform: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+$')]),
    last_name: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]+$')]),
    mobileno: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{12}")]),
    orgname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    user_category_id: new FormControl('', [Validators.required]),
    user_sub_category_id: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required]),
    
  },
  {
    validators:matchpassword
  }
  )
  
  showPassword:boolean=false;
  
  newoptionvalue:any;
  users: any;
  newuser: any;
  user_generator: any;
  tokenNo:any;
  newusermember:any;
  result1:any;
  
  
  get confirmpassword(){
    return this.registerform.get('password_confirmation')
  }
  
  // registerform: any
  
  constructor(private data: HttpService,
    private recaptchaV3Service :ReCaptchaV3Service,
    private router:Router) {}

  ngOnInit():void{
    this.requestDataFromMultipleSources().subscribe((responseList) => {
      console.log('responseList')
     this.tokenNo=responseList[0]  //token
    });
    this.RequestingCall();
  }
  public requestDataFromMultipleSources(): Observable<any[]> {
    let response1 = this.recaptchaV3Service.execute("importantAction");
    return forkJoin( [response1])

  }

  RequestingCall(item?:any ){
    this.data.requestCall(AuthEndPoints.REGISTER_USER, ApiMethod.POST, item ).subscribe((res) => {  
      this.users = res;
      this.newuser = this.users.data;
      console.log(this.users);
    });

  }

  
  
  loader:boolean=true
  newvalue:any;
  clicked(value:any) {
    this.newvalue=value
    const  jsondata = {catid: 3};
    if (this.newvalue === 3) {
      this.data.requestCall(AuthEndPoints.SubUserCategories, ApiMethod.POST, jsondata  ).subscribe(data => {
        this.user_generator = data;
        this.newoptionvalue = this.user_generator.data
        this.loader=false
        console.log(this.user_generator);
        
      });
    }
    
  }

  
  
  
  
  togglePasswordVisibility():void{
  this.showPassword=false;
  this.showPassword= !this.showPassword
}
loginUser(data:any){
  const finaldata = {...this.registerform.value, tokenNo:this.tokenNo}
console.log(finaldata );
this.data.requestCall(AuthEndPoints.signup, ApiMethod.POST,finaldata).subscribe((res1)=>{
  this.result1=res1
  console.log(this.result1)
  const { description, reference, otp_expiry_in_sec } = res1;
  sessionStorage.setItem('description',description);
  sessionStorage.setItem('reference',reference);
  sessionStorage.setItem('otp_expiry_in_sec',otp_expiry_in_sec);


  this.router.navigate(["verify"])
});



}
}


// get fname(){
//   return this.registerform.get('fname')
// }
// get email(){
//   return this.registerform.get('email')
// }



