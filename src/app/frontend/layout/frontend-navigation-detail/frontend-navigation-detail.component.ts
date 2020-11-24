import { Component, OnInit } from '@angular/core';
import { CategoryStore } from 'src/app/stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';

@Component({
  selector: 'app-frontend-navigation-detail',
  templateUrl: './frontend-navigation-detail.component.html',
  styleUrls: ['./frontend-navigation-detail.component.scss']
})
export class FrontendNavigationDetailComponent implements OnInit {

  constructor(
    public categoryStore : CategoryStore,
    public subCategoryStore: SubCategoryStore
  ) { }

  ngOnInit(): void {
    this.categoryStore.getPublishedCategories();
    this.subCategoryStore.getPublishedCategories();
  }

}
