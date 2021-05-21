import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddCategoryComponent } from '../../../components/category/add-category/add-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

import { Category } from 'src/app/models/category.model';
import { CategoryStore } from '../../../stores/category.store';
import { DateFormatService } from '../../../services/data-manipulation/date-format.service';
import { AddIconPackageComponent } from '../add-icon-package/add-icon-package.component';

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
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '750px',
      height: '96vh',
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  editCategory(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '750px',
      height: '96vh',
      data: { ...category }
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
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

  OpenAddIconPackageDialog() {
    const dialogRef = this.dialog.open(AddIconPackageComponent, {
      width: '750px',
      height: '96vh',
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }
}
