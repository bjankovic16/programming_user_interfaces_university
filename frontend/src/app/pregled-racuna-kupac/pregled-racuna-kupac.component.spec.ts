import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledRacunaKupacComponent } from './pregled-racuna-kupac.component';

describe('PregledRacunaKupacComponent', () => {
  let component: PregledRacunaKupacComponent;
  let fixture: ComponentFixture<PregledRacunaKupacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledRacunaKupacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledRacunaKupacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
