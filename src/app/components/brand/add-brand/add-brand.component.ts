import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { BrandStore } from '../../../stores/brand.store';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBrandComponent implements OnInit {
  addBrandForm;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  imageFile: File;

  task: AngularFireUploadTask;

  constructor(
    private formBuilder: FormBuilder,
    private brandStore: BrandStore,
    private storage: AngularFireStorage,
  ) {
    this.addBrandForm = this.formBuilder.group({
      name: '',
      image: null,
    });
  }

  ngOnInit(): void {

  }

  onSubmit(formData) {
    this.startUpload(formData);
  }

  uploadFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  startUpload(formData) {
    if(formData.name == '' || formData.image == null || formData.image == '') {
      alert('Please input brand information')
      return;
    }
    else {
      const path = `brands/${Date.now()}_${this.imageFile.name}`;
      const ref = this.storage.ref(path);

      this.task = this.storage.upload(path, this.imageFile);
      this.percentage = this.task.percentageChanges();

      this.task.then(f=>{
        f.ref.getDownloadURL().then(url=>{
          this.brandStore.addBrand({ ...formData, image: url, imagePath: path });
          this.addBrandForm.reset();
        })
      });
    }
  }
}
