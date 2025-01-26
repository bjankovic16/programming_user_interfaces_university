import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnevniPazarComponent } from './dnevni-pazar.component';

describe('DnevniPazarComponent', () => {
  let component: DnevniPazarComponent;
  let fixture: ComponentFixture<DnevniPazarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DnevniPazarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DnevniPazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
