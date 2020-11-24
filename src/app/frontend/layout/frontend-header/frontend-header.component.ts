import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frontend-header',
  templateUrl: './frontend-header.component.html',
  styleUrls: ['./frontend-header.component.scss']
})
export class FrontendHeaderComponent implements OnInit {
  keyword;

  constructor(
    public route: Router,
  ) { }

  ngOnInit(): void {

  }

  searchProduct() {
    this.route.navigate(['/searchProduct/' + this.keyword]);
  }
}
