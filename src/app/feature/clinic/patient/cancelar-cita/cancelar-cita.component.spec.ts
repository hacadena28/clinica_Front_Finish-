import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarCitaComponent } from './cancelar-cita.component';

describe('ReagendarCitaComponent', () => {
  let component: CancelarCitaComponent;
  let fixture: ComponentFixture<CancelarCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelarCitaComponent]
    });
    fixture = TestBed.createComponent(CancelarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
