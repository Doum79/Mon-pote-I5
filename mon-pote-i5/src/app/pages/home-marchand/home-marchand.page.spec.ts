import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMarchandPage } from './home-marchand.page';

describe('HomeMarchandPage', () => {
  let component: HomeMarchandPage;
  let fixture: ComponentFixture<HomeMarchandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMarchandPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMarchandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
