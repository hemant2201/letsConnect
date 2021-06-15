import { Component } from '@angular/core';
import { UtilityServiceService } from './services/utility-service/utility-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'letsConnectFrontEnd';
  constructor(private utilService: UtilityServiceService) {}
  deActivateSelfMode(): void {
    this.utilService.selfProfileMode = false;
  }
  activateSelfMode(): void {
    this.utilService.selfProfileMode = true;
  }
}
