import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifPage } from './verif.page';

describe('VerifPage', () => {
  let component: VerifPage;
  let fixture: ComponentFixture<VerifPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
