import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from 'src/app/services/utility-service/utility-service.service';

@Component({
  selector: 'app-left-profile-suggestions',
  templateUrl: './left-profile-suggestions.component.html',
  styleUrls: ['./left-profile-suggestions.component.css'],
})
export class LeftProfileSuggestionsComponent implements OnInit {
  constructor(private utilService: UtilityServiceService) {}
  userInfo: any;
  url: any;
  userProfileInfo: any;
  ngOnInit(): void {
    console.log(this.utilService.userInfo);
    this.userInfo = this.utilService.userInfo;
    this.url =
      this.utilService.baseUrl +
      '/user?userId=' +
      this.userInfo.provider +
      '_' +
      this.userInfo.id;
    this.utilService.getData(this.url).subscribe((res: any) => {
      console.log(res);
      this.userProfileInfo = res.data[0];
      console.log(this.userProfileInfo.followersCoount);
      console.log(this.userProfileInfo.followingCount);
    });
  }

  viewSelfProfileDetails(): void {
    this.utilService.selfProfileMode = true;
  }
}
