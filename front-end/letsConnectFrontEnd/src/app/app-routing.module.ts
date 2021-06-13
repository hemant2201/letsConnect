import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginHomepageComponent } from './login-homepage/login-homepage.component';
import { HomeFeedpageComponent } from './home-feedpage/home-feedpage.component';

const routes: Routes = [
  { path: '', component: LoginHomepageComponent },
  { path: 'home', component: HomeFeedpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
