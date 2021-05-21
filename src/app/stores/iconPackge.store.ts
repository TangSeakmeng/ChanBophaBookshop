import { observable } from "mobx";
import { Injectable } from "@angular/core";

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { SlideShowImage } from '../models/slideShowImage.model';

@Injectable({providedIn:'root'})
export class IconPackageStore {
  @observable public iconPackages = [];
  @observable public iconPackageImages = [];
  @observable public iconPackage;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {}

  getIconPackages() {
    this.afs.collection('iconPackages').valueChanges().subscribe((data) => {
      this.iconPackages = data;
      this.iconPackage = this.iconPackages[0];
      this.getIconPackageImagesByKey(this.iconPackage.key)
    })
  }

  getIconPackageImagesByKey(key) {
    this.afs.collection('iconPackages').doc(key).collection('imagesCollection').valueChanges().subscribe((data) => {
      this.iconPackageImages = data
    })
  }

  addIconPackageImages(iconPackage) {
    const key = this.afs.createId()

    this.afs.collection('iconPackages').doc(key).set({
      key,
      name: iconPackage.name,
    }).then((data) => {
      iconPackage.images.forEach((item) => {
        const key_2 = this.afs.createId();

        this.afs.collection('iconPackages').doc(key).collection('imagesCollection').doc(key_2).set({
          key: key_2,
          ...item
        })
      })
    });
  }

  updateIconPackageImages(image) {
    this.afs.collection(`iconPackages`).doc(image.key).update(image);
  }
}
