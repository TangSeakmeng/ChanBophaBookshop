import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryStore } from 'src/app/stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';

@Component({
  selector: 'app-fate-menu-dialog2',
  templateUrl: './fate-menu-dialog2.component.html',
  styleUrls: ['./fate-menu-dialog2.component.scss']
})
export class FateMenuDialog2Component implements OnInit {

  keyword = '';

  constructor (
    public route: Router,

    public categoryStore : CategoryStore,
    public subCategoryStore: SubCategoryStore,

    public dialogRef: MatDialogRef<FateMenuDialog2Component>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    console.log(this.data)
  }

  searchProduct() {
    this.route.navigate(['/searchProduct/' + this.keyword]);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  linkToSubcategoryProducts(item) {
    this.route.navigate(['/subcategory/' + item.key]);
    this.dialogRef.close();
  }
}
