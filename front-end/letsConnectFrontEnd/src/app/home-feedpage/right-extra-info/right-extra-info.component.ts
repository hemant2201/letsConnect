import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from 'src/app/services/utility-service/utility-service.service';

@Component({
  selector: 'app-right-extra-info',
  templateUrl: './right-extra-info.component.html',
  styleUrls: ['./right-extra-info.component.css'],
})
export class RightExtraInfoComponent implements OnInit {
  userDetails: any;
  constructor(private utilService: UtilityServiceService) {}

  ngOnInit(): void {
    this.userDetails = this.utilService.userInfo;
  }
}
