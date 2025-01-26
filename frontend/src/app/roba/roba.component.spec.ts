import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobaComponent } from './roba.component';

describe('RobaComponent', () => {
  let component: RobaComponent;
  let fixture: ComponentFixture<RobaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
