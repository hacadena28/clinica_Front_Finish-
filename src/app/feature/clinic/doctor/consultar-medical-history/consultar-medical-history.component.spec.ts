import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarMedicalHistoryComponent } from './consultar-medical-history.component';

describe('ConsultarMedicalHistoryComponent', () => {
  let component: ConsultarMedicalHistoryComponent;
  let fixture: ComponentFixture<ConsultarMedicalHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarMedicalHistoryComponent]
    });
    fixture = TestBed.createComponent(ConsultarMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
