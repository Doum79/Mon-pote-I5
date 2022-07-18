import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonnerMonnaiePage } from './donner-monnaie.page';

describe('DonnerMonnaiePage', () => {
  let component: DonnerMonnaiePage;
  let fixture: ComponentFixture<DonnerMonnaiePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonnerMonnaiePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonnerMonnaiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
