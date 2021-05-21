import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { IconPackageStore } from 'src/app/stores/iconPackge.store';

@Component({
  selector: 'app-add-icon-package',
  templateUrl: './add-icon-package.component.html',
  styleUrls: ['./add-icon-package.component.scss']
})
export class AddIconPackageComponent implements OnInit {
  packageName = '';
  selectedFiles: any[] = [];
  firebaseUploadedImages = [];

  downloadURL: string;
  imageFile: File;
  task: AngularFireUploadTask;
  percentage: Observable<number>;

  @ViewChild('fileUpload') fileUpload : any;

  constructor(
    private iconPackageStore: IconPackageStore,
    public storage: AngularFireStorage,
    public _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  uploadFileChange(event: any) {
    this.selectedFiles = event.currentFiles;
  }

  clearSelectedFiles() {
    this.fileUpload.clear();
    this.selectedFiles = [];
    this.firebaseUploadedImages = [];
  }

  insertDataIntoFirebase() {
    try {
      const data = {
        name: this.packageName,
        images: this.firebaseUploadedImages
      };

      this.iconPackageStore.addIconPackageImages(data);

      this.clearSelectedFiles();
      this.openSnackBar('Add Package Successfully.', 'Close');
    } catch (error) {
      console.log(error)
    }
  }

  submitUploading() {
    if(this.selectedFiles.length == 0) {
      this.openSnackBar('Please Select Any Files First.', 'Close');
      return;
    }

    if(!this.packageName) {
      this.openSnackBar('Please input package name.', 'Close');
      return;
    }

    this.selectedFiles.forEach((item) => {
      const path = `icons/${this.packageName}/${Date.now()}_${item.name}`;
      const ref = this.storage.ref(path);

      this.task = this.storage.upload(path, item);
      this.percentage = this.task.percentageChanges();

      this.task.then((f) => {
        f.ref.getDownloadURL().then((url) => {
          let elementGallery = {
            image: url,
            imagePath: path,
          };

          this.firebaseUploadedImages.push(elementGallery)

          if(this.firebaseUploadedImages.length == this.selectedFiles.length)
            this.insertDataIntoFirebase();
        });
      });
    })
  }

}
