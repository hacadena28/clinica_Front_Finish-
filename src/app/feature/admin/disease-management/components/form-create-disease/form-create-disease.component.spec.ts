import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateDiseaseComponent } from './form-create-disease.component';

describe('FormCreateDiseaseComponent', () => {
  let component: FormCreateDiseaseComponent;
  let fixture: ComponentFixture<FormCreateDiseaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateDiseaseComponent]
    });
    fixture = TestBed.createComponent(FormCreateDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
