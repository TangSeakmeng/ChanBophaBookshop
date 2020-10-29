import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand.model';

import { BrandStore } from '../../../stores/brand.store';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {
  editBrandForm;

  percentage: Observable<number>;

  imageFile: File;
  imageUrl: string;
  imagePath: string;
  brandId: string;

  task: AngularFireUploadTask;

  constructor(
    private formBuilder: FormBuilder,
    public brandStore: BrandStore,
    private storage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public data: Brand
  ) {
    this.editBrandForm = this.formBuilder.group({
      name: data.name
    });

    this.brandId = data.key;
    this.imageUrl = data.image;
  }

  ngOnInit(): void {
    this.brandStore.getBrandByKey(this.brandId);
  }

  onSubmit(formData) {
    if(this.imageFile) {
      this.startUpload(formData);
    }
    else {
      this.brandStore.updateBrand({
        ...formData,
        key: this.brandId,
        updatedAt: Date.now()
      }, null);
    }
  }

  uploadFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  startUpload(formData) {
    const path = `brands/${Date.now()}_${this.imageFile.name}`;
    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, this.imageFile);
    this.percentage = this.task.percentageChanges();

    this.task.then(f=>{
      f.ref.getDownloadURL().then(url=>{

        this.brandStore.updateBrand({
          ...formData,
          key: this.brandId,
          image: url,
          imagePath: path,
          updatedAt: Date.now()
        }, this.brandStore.brand.imagePath);
      })
    });
  }
}
