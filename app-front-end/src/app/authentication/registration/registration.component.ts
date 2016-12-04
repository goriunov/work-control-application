import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../../shared/user";


@Component({
  selector: "my-reg-auth",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})


export class RegistrationComponent implements OnInit{
  myForm: FormGroup;

  constructor(private authService: AuthenticationService){}
  ngOnInit() {
    this.myForm = new FormGroup({
      'email': new FormControl('' , Validators.required ),
      'password' : new FormControl('' , Validators.required),
      'firstName': new FormControl('' , Validators.required),
      'lastName': new FormControl('' ,Validators.required),
      'phoneNumber': new FormControl('' ,Validators.required)
    });
  }

  onSubmit(){
    var user = new User(this.myForm.controls['email'].value ,this.myForm.controls['password'].value ,this.myForm.controls['phoneNumber'].value,this.myForm.controls['firstName'].value ,this.myForm.controls['lastName'].value);
    this.authService.registration(user);
  }
}
