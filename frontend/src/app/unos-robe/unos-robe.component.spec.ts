import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosRobeComponent } from './unos-robe.component';

describe('UnosRobeComponent', () => {
  let component: UnosRobeComponent;
  let fixture: ComponentFixture<UnosRobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnosRobeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnosRobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
