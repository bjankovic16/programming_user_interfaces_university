import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosStolovaComponent } from './unos-stolova.component';

describe('UnosStolovaComponent', () => {
  let component: UnosStolovaComponent;
  let fixture: ComponentFixture<UnosStolovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnosStolovaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnosStolovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
