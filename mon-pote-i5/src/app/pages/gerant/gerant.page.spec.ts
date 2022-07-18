import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerantPage } from './gerant.page';

describe('GerantPage', () => {
  let component: GerantPage;
  let fixture: ComponentFixture<GerantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerantPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
