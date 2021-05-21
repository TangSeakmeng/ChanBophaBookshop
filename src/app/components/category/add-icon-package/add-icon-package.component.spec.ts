import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIconPackageComponent } from './add-icon-package.component';

describe('AddIconPackageComponent', () => {
  let component: AddIconPackageComponent;
  let fixture: ComponentFixture<AddIconPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIconPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIconPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
