import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';

import { CategoryStore } from '../../../stores/category.store';

import { CategoryMappingService } from 'src/app/services/mapping/category-mapping.service';
import { BrandMappingService } from 'src/app/services/mapping/brand-mapping.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  editCategoryForm;

  constructor(
    public formBuilder: FormBuilder,
    public storage: AngularFireStorage,

    public categoryMapping: CategoryMappingService,
    public brandMapping: BrandMappingService,

    public categoryStore: CategoryStore,

    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    this.editCategoryForm = this.formBuilder.group({
      name: this.data.name,
    });
  }

  ngOnInit(): void {

  }

  onSubmit(formData) {
    this.categoryStore.updateCategory({
      ...formData,
      key: this.data.key,
      updatedAt: Date.now()
    });
  }
}
