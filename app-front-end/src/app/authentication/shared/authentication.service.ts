import {Injectable} from "@angular/core";
import {User} from "../../shared/user";
import 'rxjs/Rx';
import {Http, Headers} from "@angular/http";

@Injectable()


export class AuthenticationService {

  constructor(private http: Http){}

  registration(user: User){
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});

    //noinspection TypeScriptUnresolvedFunction
    this.http.post("user/registration" , body , {headers: headers})
      .map((response)=> response.json())
      .subscribe(
      (response)=>{
        console.log(response)
      });
  }

  signin(user: User){
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    
  //noinspection TypeScriptUnresolvedFunction
    this.http.post('user/sign-in' , body , {headers: headers})
      .map((response)=> response.json())
      .subscribe(
        (response) => {
          console.log(response);
        }
      )
  }
}
