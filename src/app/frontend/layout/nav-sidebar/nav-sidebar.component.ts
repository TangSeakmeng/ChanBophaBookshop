import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryStore } from 'src/app/stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss']
})
export class NavSidebarComponent implements OnInit {

  constructor(
    public categoryStore : CategoryStore,
    public subCategoryStore: SubCategoryStore
  ) { }

  ngOnInit(): void {
    this.categoryStore.getPublishedCategories();
    this.subCategoryStore.getPublishedCategories();
  }
}
