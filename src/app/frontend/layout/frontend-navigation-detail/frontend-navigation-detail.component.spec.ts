import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendNavigationDetailComponent } from './frontend-navigation-detail.component';

describe('FrontendNavigationDetailComponent', () => {
  let component: FrontendNavigationDetailComponent;
  let fixture: ComponentFixture<FrontendNavigationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontendNavigationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendNavigationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
