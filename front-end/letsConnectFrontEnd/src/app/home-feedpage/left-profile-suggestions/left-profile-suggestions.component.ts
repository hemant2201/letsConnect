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
  ngOnInit(): void {
    console.log(this.utilService.userInfo);
    this.userInfo = this.utilService.userInfo;
  }
}
