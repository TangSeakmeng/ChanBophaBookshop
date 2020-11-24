import { Component, OnInit } from '@angular/core';
import { InformationStore } from 'src/app/stores/information.store';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  constructor(
    public informationStore: InformationStore
  ) { }

  ngOnInit(): void {
    this.informationStore.getInformation();
  }

  telChanged(value) {
    this.informationStore.updateInformation(value, 'tel')
  }

  emailChanged(value) {
    this.informationStore.updateInformation(value, 'email')
  }

  facebookPageChanged(value) {
    this.informationStore.updateInformation(value, 'facebook_page')
  }

  addressChanged(value) {
    this.informationStore.updateInformation(value, 'address')
  }
}
