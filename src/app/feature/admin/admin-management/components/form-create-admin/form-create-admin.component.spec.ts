import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateAdminComponent } from './form-create-admin.component';

describe('FormCreateAdminComponent', () => {
  let component: FormCreateAdminComponent;
  let fixture: ComponentFixture<FormCreateAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateAdminComponent]
    });
    fixture = TestBed.createComponent(FormCreateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
