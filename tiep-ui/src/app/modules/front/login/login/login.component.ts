import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationRequest} from "../../../../services/models/authentication-request";
import {AuthenticationService} from "../../../../services/services/authentication.service";
import {TokenService} from "../../../../services/token/token.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        console.log("check res",res);
        let token;
        if (res instanceof Blob) {
          // Convert blob response to JSON
          this.tokenService.blobToJson(res).subscribe({
            next: (jsonRes) => {
              token = jsonRes.token;
              this.processLogin(token);
            },
            error: (err) => {
              console.error("Error parsing JSON response", err);
            }
          });
        }
      },
      error: (err) => {
        console.error("Error during authentication", err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
  }

  private processLogin(token: string) {
    console.log("check token 1", this.tokenService.token);
    this.tokenService.token = token;
    console.log("check token 2", token);
    const userRoles = this.tokenService.userRoles;
    console.log("check token role ", userRoles);

    if (userRoles.includes('ADMIN')) {
      this.router.navigate(['/admin/dashboard']);
    } else if (userRoles.includes('ITEXPERT')) {
      this.router.navigate(['/expert/dashboard']);
    } else if (userRoles.includes('ENTREPRENEUR')) {
      this.router.navigate(['/entrepreneur/dashboard']);
    } else {
      this.router.navigate(['']);
    }
  }


  register() {
    this.router.navigate(['register']);
  }
}
