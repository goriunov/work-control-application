import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../shared/user";

@Component({
  selector: "my-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ['./signin.component.scss']
})


export class SignInComponent implements OnInit {
  myForm: FormGroup;
  constructor(private authService: AuthenticationService){}
  ngOnInit(){
    this.myForm = new FormGroup({
      'email': new FormControl('' , Validators.required),
      'password': new FormControl('' , Validators.required)
    });
  }

  onSubmit(){
    var user = new User(this.myForm.controls['email'].value , this.myForm.controls['password'].value);
    this.authService.signin(user);
  }
}
