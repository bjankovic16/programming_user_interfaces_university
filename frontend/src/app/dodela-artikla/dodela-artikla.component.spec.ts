import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodelaArtiklaComponent } from './dodela-artikla.component';

describe('DodelaArtiklaComponent', () => {
  let component: DodelaArtiklaComponent;
  let fixture: ComponentFixture<DodelaArtiklaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodelaArtiklaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodelaArtiklaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
