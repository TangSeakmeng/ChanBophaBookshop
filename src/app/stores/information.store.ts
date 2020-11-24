import { observable } from "mobx";
import { Injectable } from "@angular/core";

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({providedIn:'root'})
export class InformationStore {
  @observable public information = [];

  constructor(private afs: AngularFirestore) {}

  getInformation() {
    this.afs.collection('information').valueChanges().subscribe((data) => {
      this.information = data
    })
  }

  updateInformation(information, key) {
    this.afs.collection(`information`).doc(key).update({ value: information });
  }
}
