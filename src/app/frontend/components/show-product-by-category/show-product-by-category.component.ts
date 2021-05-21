import { Component, Input, OnInit, Output } from '@angular/core';
import { CategoryStore } from 'src/app/stores/category.store';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-show-product-by-category',
  templateUrl: './show-product-by-category.component.html',
  styleUrls: ['./show-product-by-category.component.scss']
})
export class ShowProductByCategoryComponent implements OnInit {

  constructor(
    public categoryStore: CategoryStore,
  ) { }

  ngOnInit(): void {
    this.categoryStore.ProductsByCategory = [];
    this.categoryStore.getGroupProductsByCategories();
  }

  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 5,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: true
  };
}

