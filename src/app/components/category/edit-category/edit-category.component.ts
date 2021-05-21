import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';

import { CategoryStore } from '../../../stores/category.store';

import { CategoryMappingService } from 'src/app/services/mapping/category-mapping.service';
import { BrandMappingService } from 'src/app/services/mapping/brand-mapping.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';
import { IconPackageStore } from 'src/app/stores/iconPackge.store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  selectedIconPackage = '';
  selectedImage;
  editCategoryForm;
  categoryData;

  constructor(
    public formBuilder: FormBuilder,
    public storage: AngularFireStorage,

    public categoryMapping: CategoryMappingService,
    public brandMapping: BrandMappingService,

    public iconPackagetStore: IconPackageStore,
    public categoryStore: CategoryStore,

    public _snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    this.editCategoryForm = this.formBuilder.group({
      name: this.data.name,
    });

    this.categoryData = this.data;
  }

  ngOnInit(): void {
    this.iconPackagetStore.getIconPackages();
  }

  onSubmit(formData) {
    if(this.selectedImage) {
      this.categoryStore.updateCategory({
        ...formData,
        icon: this.selectedImage,
        key: this.data.key,
        updatedAt: Date.now()
      });
    } else {
      this.openSnackBar('Please Select Any Icon First.', 'Close');
      return;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  compareFn(user1:any, user2: any) {
    return user1 && user2 ? user1.key === user2.key : user1 === user2;
  }

  selectIconPackageChanged(event) {
    this.iconPackagetStore.getIconPackageImagesByKey(event.value.key);
  }

  selectImageChanged(item) {
    this.selectedImage = item;
  }
}
