import { Component, OnInit } from '@angular/core';
import { InformationStore } from 'src/app/stores/information.store';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  title = 'Our Location';
  lat = 51.678418;
  lng = 7.809007;

  constructor(
    public informationStore: InformationStore
  ) { }

  ngOnInit(): void {
    this.informationStore.getInformation();
  }

}
