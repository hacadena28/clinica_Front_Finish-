import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateDiseaseComponent } from './form-update-disease.component';

describe('FormUpdateDiseaseComponent', () => {
  let component: FormUpdateDiseaseComponent;
  let fixture: ComponentFixture<FormUpdateDiseaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUpdateDiseaseComponent]
    });
    fixture = TestBed.createComponent(FormUpdateDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
