import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonneyPage } from './monney.page';

describe('MonneyPage', () => {
  let component: MonneyPage;
  let fixture: ComponentFixture<MonneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonneyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
