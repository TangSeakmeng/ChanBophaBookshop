import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendNavigation2Component } from './frontend-navigation2.component';

describe('FrontendNavigation2Component', () => {
  let component: FrontendNavigation2Component;
  let fixture: ComponentFixture<FrontendNavigation2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontendNavigation2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendNavigation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
