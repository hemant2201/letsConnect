import { Component, OnChanges, OnInit, DoCheck } from '@angular/core';
import { UtilityServiceService } from 'src/app/services/utility-service/utility-service.service';
import { ViewChild } from '@angular/core';
import { getMatFormFieldMissingControlError } from '@angular/material/form-field';
@Component({
  selector: 'app-center-feed-list',
  templateUrl: './center-feed-list.component.html',
  styleUrls: ['./center-feed-list.component.css'],
})
export class CenterFeedListComponent implements OnInit, DoCheck, OnChanges {
  constructor(private utilService: UtilityServiceService) {}

  postContent: any;
  postBody: any;
  userDetails: any;
  fileName: any;
  feedList: any;
  selfMode: boolean = false;
  @ViewChild('postTextContent') input: any;

  ngOnInit(): void {
    this.userDetails = this.utilService.userInfo;
    this.getTimeline();
    this.postBody = {
      content: '',
      photoUrl:
        'https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270',
    };
  }

  ngDoCheck(): void {
    if (this.selfMode != this.utilService.selfProfileMode) {
      this.selfMode = this.utilService.selfProfileMode;
      this.getTimeline();
    }
  }

  ngOnChanges(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file;
      console.log(this.fileName);
    }
  }

  getTimeline(): void {
    if (this.selfMode == false) {
      this.utilService
        .getData(
          this.utilService.baseUrl +
            '/timeline?userId=' +
            this.userDetails.provider +
            '_' +
            this.userDetails.id
        )
        .subscribe((data: any) => {
          console.log('My timeline ' + data);
          this.feedList = data.data;
          this.feedList.forEach((ele: any) => {
            this.utilService
              .getData(this.utilService.baseUrl + '/user?userId=' + ele.userId)
              .subscribe((data: any) => {
                ele.name = data.data[0].name;
                ele.photoUrl = data.data[0].photoUrl;
                console.log('yyyyyyyyyyyyyy  ' + this.feedList[0].name);
              });
          });
        });
    } else {
      this.utilService
        .getData(
          this.utilService.baseUrl +
            '/self?userId=' +
            this.userDetails.provider +
            '_' +
            this.userDetails.id
        )
        .subscribe((data: any) => {
          console.log('self timeline ' + data);
          this.feedList = data.data;
          console.log('self feed ' + this.feedList);
        });
    }
  }

  PostContent(): void {
    this.postBody.userId =
      this.userDetails.provider + '_' + this.userDetails.id;
    this.postBody.content = this.postContent;
    this.utilService
      .postdata(this.utilService.baseUrl + '/post', this.postBody)
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  followPerson(userId: string) {
    this.utilService
      .postdata(this.utilService.baseUrl + '/follow', {
        userId: this.userDetails.provider + '_' + this.userDetails.id,
        followeeId: userId,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
  postsList: any = [{}];
}
