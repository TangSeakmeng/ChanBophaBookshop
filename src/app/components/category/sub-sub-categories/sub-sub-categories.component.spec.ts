import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubCategoriesComponent } from './sub-sub-categories.component';

describe('SubSubCategoriesComponent', () => {
  let component: SubSubCategoriesComponent;
  let fixture: ComponentFixture<SubSubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSubCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
