import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdatePatientComponent } from './form-update-patient.component';

describe('FormUpdatePatientComponent', () => {
  let component: FormUpdatePatientComponent;
  let fixture: ComponentFixture<FormUpdatePatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUpdatePatientComponent]
    });
    fixture = TestBed.createComponent(FormUpdatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
