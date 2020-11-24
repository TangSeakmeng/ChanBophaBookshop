import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Gallery } from 'src/app/models/gallery.model';
import { SlideShowStore } from 'src/app/stores/slideshow.store';

@Component({
  selector: 'app-add-slide-show',
  templateUrl: './add-slide-show.component.html',
  styleUrls: ['./add-slide-show.component.scss']
})
export class AddSlideShowComponent implements OnInit {
  selectedFiles: any[] = [];
  firebaseUploadedImages = [];

  downloadURL: string;
  imageFile: File;
  task: AngularFireUploadTask;
  percentage: Observable<number>;

  @ViewChild('fileUpload') fileUpload : any;

  constructor(
    private slideShowStore: SlideShowStore,
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
      this.firebaseUploadedImages.forEach((item) => {
        const data = {
          ...item
        };

        this.slideShowStore.addSlideShowImage(data);
      })

      this.clearSelectedFiles();
      this.openSnackBar('Add Product Successfully.', 'Close');
    } catch (error) {
      console.log(error)
    }
  }

  submitUploading() {
    if(this.selectedFiles.length == 0) {
      this.openSnackBar('Please Select Any Files First.', 'Close');
      return;
    }

    this.selectedFiles.forEach((item) => {
      const path = `slideshows/${Date.now()}_${item.name}`;
      const ref = this.storage.ref(path);

      this.task = this.storage.upload(path, item);
      this.percentage = this.task.percentageChanges();

      this.task.then((f) => {
        f.ref.getDownloadURL().then((url) => {
          let elementGallery = {
            image: url,
            imagePath: path,
            published: true,
          };

          this.firebaseUploadedImages.push(elementGallery)

          if(this.firebaseUploadedImages.length == this.selectedFiles.length)
            this.insertDataIntoFirebase();
        });
      });
    })
  }
}
