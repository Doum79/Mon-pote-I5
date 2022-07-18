import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayePage } from './paye.page';

describe('PayePage', () => {
  let component: PayePage;
  let fixture: ComponentFixture<PayePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
