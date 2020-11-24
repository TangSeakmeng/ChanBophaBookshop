import { Component, OnInit } from '@angular/core';
import { CategoryStore } from 'src/app/stores/category.store';
import { ProductStore } from 'src/app/stores/product.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
}
