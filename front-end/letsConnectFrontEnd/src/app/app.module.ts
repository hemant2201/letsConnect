import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginHomepageComponent } from './login-homepage/login-homepage.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { HomeFeedpageComponent } from './home-feedpage/home-feedpage.component';
import { LeftProfileSuggestionsComponent } from './home-feedpage/left-profile-suggestions/left-profile-suggestions.component';
import { CenterFeedListComponent } from './home-feedpage/center-feed-list/center-feed-list.component';
import { RightExtraInfoComponent } from './home-feedpage/right-extra-info/right-extra-info.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginHomepageComponent,
    HomeFeedpageComponent,
    LeftProfileSuggestionsComponent,
    CenterFeedListComponent,
    RightExtraInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    SocialLoginModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '581064899938-61e9ulo2f25iu3fe441tq6trts8l9ut1.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('323151178482667'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
