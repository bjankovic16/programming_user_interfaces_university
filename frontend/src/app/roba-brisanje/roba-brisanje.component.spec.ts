import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobaBrisanjeComponent } from './roba-brisanje.component';

describe('RobaBrisanjeComponent', () => {
  let component: RobaBrisanjeComponent;
  let fixture: ComponentFixture<RobaBrisanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobaBrisanjeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobaBrisanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
