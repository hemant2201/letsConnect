import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from 'src/app/services/utility-service/utility-service.service';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-center-feed-list',
  templateUrl: './center-feed-list.component.html',
  styleUrls: ['./center-feed-list.component.css'],
})
export class CenterFeedListComponent implements OnInit {
  constructor(private utilService: UtilityServiceService) {}

  userDetails: any;
  fileName: any;

  @ViewChild('postTextContent') input: any;
  ngOnInit(): void {
    this.userDetails = this.utilService.userInfo;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file;
      console.log(this.fileName);
    }
  }

  postsList: any = [{}];
}
