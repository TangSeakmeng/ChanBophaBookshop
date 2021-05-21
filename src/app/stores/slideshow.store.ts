import { observable } from "mobx";
import { Injectable } from "@angular/core";

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { SlideShowImage } from '../models/slideShowImage.model';

@Injectable({providedIn:'root'})
export class SlideShowStore {
  @observable public images = [];

  @observable public loading: boolean = false;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {}

  getSlideShowImages() {
    this.loading = true;
    this.afs.collection('slideshow').valueChanges().subscribe((data) => {
      this.images = data;
      this.loading = false;
    })
  }

  getPublishedSlideShowImages() {
    this.afs.collection('slideshow', ref => ref.where('published', '==', true)).valueChanges().subscribe((data) => {
      this.images = data
    })
  }

  addSlideShowImage(image) {
    const key = this.afs.createId()
    this.afs.collection('slideshow').doc(key).set({
      key,
      ...image,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  updateSlideShowImage(image) {
    this.afs.collection(`slideshow`).doc(image.key).update(image);
  }

  deleteSlideShowImage(image: SlideShowImage) {
    this.storage.ref(image.imagePath).delete();
    this.afs.collection(`slideshow`).doc(image.key).delete();
  }
}
