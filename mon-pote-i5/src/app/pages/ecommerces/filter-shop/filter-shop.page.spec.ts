import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterShopPage } from './filter-shop.page';

describe('FilterShopPage', () => {
  let component: FilterShopPage;
  let fixture: ComponentFixture<FilterShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterShopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
