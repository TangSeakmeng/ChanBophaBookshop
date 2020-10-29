import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product_data;
  @Input() slider_images;

  constructor() { }

  ngOnInit(): void { }

  formatDate(datetime) {
    var dt = new Date(datetime);
    if(dt.getHours() > 12)
      return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()} ${dt.getHours() - 12}:${dt.getMinutes()}:${dt.getSeconds()} PM`;
    else
      return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()} AM`;
  }
}
