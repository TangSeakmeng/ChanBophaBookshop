import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlideShowComponent } from './add-slide-show.component';

describe('AddSlideShowComponent', () => {
  let component: AddSlideShowComponent;
  let fixture: ComponentFixture<AddSlideShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSlideShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSlideShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
