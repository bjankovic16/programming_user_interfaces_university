import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasporedStoComponent } from './raspored-sto.component';

describe('RasporedStoComponent', () => {
  let component: RasporedStoComponent;
  let fixture: ComponentFixture<RasporedStoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasporedStoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasporedStoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
