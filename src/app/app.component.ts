import { Component } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OnlineStore';

  constructor(
    private facebookService: FacebookService
  ) { }

  ngOnInit() {
    this.initFacebookService();
  }

  private initFacebookService(): void {
    const initParams: InitParams = { xfbml: true, version: 'v9.0' };
    this.facebookService.init(initParams);
  }
}
