import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasporedAComponent } from './raspored-a.component';

describe('RasporedAComponent', () => {
  let component: RasporedAComponent;
  let fixture: ComponentFixture<RasporedAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasporedAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasporedAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
