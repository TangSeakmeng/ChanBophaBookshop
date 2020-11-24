import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddCategoryComponent } from '../../../components/category/add-category/add-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

import { Category } from 'src/app/models/category.model';
import { CategoryStore } from '../../../stores/category.store';
import { DateFormatService } from '../../../services/data-manipulation/date-format.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public categoryStore: CategoryStore,
    public dateFormatService: DateFormatService
  ) { }

  ngOnInit(): void {
    this.categoryStore.getCategories();
  }

  OpenAddCategoryDialog() {
    this.dialog.open(AddCategoryComponent);
  }

  editCategory(category: Category) {
    this.dialog.open(EditCategoryComponent, { data: { ...category } });
  }

  deleteCategory(category) {
    var result = confirm('Are you sure to delete this record?');
    if(result) {
      this.categoryStore.deleteCategory(category);
    }
  }

  publishedChanged(result, item) {
    this.categoryStore.updateCategoryPublished(item, result);
  }

  publishedOnHomePageChanged(result, item) {
    this.categoryStore.updateCategoryPublishedOnHomePage(item, result);
  }
}
