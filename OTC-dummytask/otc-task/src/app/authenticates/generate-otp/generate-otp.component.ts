import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiMethod, AuthEndPoints } from 'src/app/constant/api-constant';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-generate-otp',
  templateUrl: './generate-otp.component.html',
  styleUrls: ['./generate-otp.component.css']
})
export class GenerateOtpComponent {
 otpform:any; 
 description:any;
 refid:any;
 otpexpiry:any;
 
constructor( private route: ActivatedRoute, private userService: HttpService){
  this.otpform = new FormGroup({
    otp1: new FormControl("",[Validators.required]),
    otp2: new FormControl("",[Validators.required]),
    otp3: new FormControl("",[Validators.required]),
    otp4: new FormControl("",[Validators.required]),
    otp5: new FormControl("",[Validators.required]),
    otp6: new FormControl("",[Validators.required]),
    otp7: new FormControl("",[Validators.required]),
    otp8: new FormControl("",[Validators.required]),
    otp9: new FormControl("",[Validators.required]),
    otp10: new FormControl("",[Validators.required]),
    otp11: new FormControl("",[Validators.required]),
    otp12: new FormControl("",[Validators.required]),
  });
}

 ngOnInit(): void {
    // Fetching data from route parameters
      this.description = sessionStorage.getItem('description');
      this.refid = sessionStorage.getItem('reference');
      this.otpexpiry = sessionStorage.getItem('otp_expiry_in_sec'); // Convert to number if needed

      // You can now use this data in your component
      console.log('Description:', this.description);
      console.log('Reference:', this.refid);
      console.log('OTP Expiry (seconds):', this.otpexpiry);
  }
   
  otpuser(){
    const emailo = this.otpform.value;
    console.log(this.otpform.value)
    
    const emailotp = emailo.otp1 + emailo.otp2 + emailo.otp3 + emailo.otp4 + emailo.otp5 + emailo.otp6
    const smsotp = emailo.otp7 + emailo.otp8 + emailo.otp9 + emailo.otp10 + emailo.otp11 + emailo.otp12
    console.log(emailotp)
    console.log(smsotp)

    const otpData = { emailotp:emailotp, smsotp:smsotp, refid: this.refid}

      this.userService.requestCall(AuthEndPoints.otpVerify, ApiMethod.POST, otpData).subscribe(( ) => {
          
        });
      this.otpform.reset();
    }
  }
  

   
  


