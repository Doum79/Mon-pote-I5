import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChoixPage } from './choix.page';

describe('ChoixPage', () => {
  let component: ChoixPage;
  let fixture: ComponentFixture<ChoixPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
