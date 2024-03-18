import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagendarCitaComponent } from './reagendar-cita.component';

describe('ReagendarCitaComponent', () => {
  let component: ReagendarCitaComponent;
  let fixture: ComponentFixture<ReagendarCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReagendarCitaComponent]
    });
    fixture = TestBed.createComponent(ReagendarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
