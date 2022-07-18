import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaissierePage } from './add-caissiere.page';

describe('AddCaissierePage', () => {
  let component: AddCaissierePage;
  let fixture: ComponentFixture<AddCaissierePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCaissierePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCaissierePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
