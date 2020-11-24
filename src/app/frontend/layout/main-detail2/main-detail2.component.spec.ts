import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDetail2Component } from './main-detail2.component';

describe('MainDetail2Component', () => {
  let component: MainDetail2Component;
  let fixture: ComponentFixture<MainDetail2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDetail2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDetail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
