import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaAdminComponent } from './promena-admin.component';

describe('PromenaAdminComponent', () => {
  let component: PromenaAdminComponent;
  let fixture: ComponentFixture<PromenaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromenaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromenaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
