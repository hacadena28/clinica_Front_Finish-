import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateAdminComponent } from './form-update-admin.component';

describe('FormUpdateAdminComponent', () => {
  let component: FormUpdateAdminComponent;
  let fixture: ComponentFixture<FormUpdateAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUpdateAdminComponent]
    });
    fixture = TestBed.createComponent(FormUpdateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
