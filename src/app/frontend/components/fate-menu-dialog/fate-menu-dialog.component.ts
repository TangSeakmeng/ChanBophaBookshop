import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryStore } from 'src/app/stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { FateMenuDialog2Component } from '../fate-menu-dialog2/fate-menu-dialog2.component';

@Component({
  selector: 'app-fate-menu-dialog',
  templateUrl: './fate-menu-dialog.component.html',
  styleUrls: ['./fate-menu-dialog.component.scss']
})
export class FateMenuDialogComponent implements OnInit {

  keyword = '';

  constructor (
    public route: Router,

    public categoryStore : CategoryStore,
    public subCategoryStore: SubCategoryStore,

    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FateMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {

  }

  searchProduct() {
    this.route.navigate(['/searchProduct/' + this.keyword]);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSubcategoryDialog(item) {
    this.dialog.open(FateMenuDialog2Component, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {item: item}
    });

    this.dialogRef.close();
  }
}
