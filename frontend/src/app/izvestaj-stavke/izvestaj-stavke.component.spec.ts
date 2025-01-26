import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzvestajStavkeComponent } from './izvestaj-stavke.component';

describe('IzvestajStavkeComponent', () => {
  let component: IzvestajStavkeComponent;
  let fixture: ComponentFixture<IzvestajStavkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzvestajStavkeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzvestajStavkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
