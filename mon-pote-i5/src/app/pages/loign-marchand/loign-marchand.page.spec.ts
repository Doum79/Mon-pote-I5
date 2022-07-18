import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoignMarchandPage } from './loign-marchand.page';

describe('LoignMarchandPage', () => {
  let component: LoignMarchandPage;
  let fixture: ComponentFixture<LoignMarchandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoignMarchandPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoignMarchandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
