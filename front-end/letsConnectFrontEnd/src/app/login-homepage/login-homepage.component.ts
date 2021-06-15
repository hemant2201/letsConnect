import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { UtilityServiceService } from '../services/utility-service/utility-service.service';
@Component({
  selector: 'app-login-homepage',
  templateUrl: './login-homepage.component.html',
  styleUrls: ['./login-homepage.component.css'],
})
export class LoginHomepageComponent implements OnInit {
  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private utilService: UtilityServiceService
  ) {}
  user: any;
  loggedIn: boolean = false;
  reqBody: any;
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });

    this.reqBody = {
      userId: '',
      email: '',
      name: '',
      photoUrl: '',
    };
  }

  signIn(res: any): void {
    this.reqBody.userId = res.provider + '_' + res.id;
    this.reqBody.email = res.email;
    this.reqBody.name = res.name;
    this.reqBody.photoUrl = res.photoUrl;
    this.utilService
      .postdata(this.utilService.baseUrl + '/user', this.reqBody)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/home']);
      });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      console.log(res);
      this.signIn(res);
      this.utilService.userInfo = res;
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res) => {
      console.log(res);
      this.signIn(res);
      this.utilService.userInfo = res;
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
