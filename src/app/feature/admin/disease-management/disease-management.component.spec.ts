import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseManagementComponent } from './disease-management.component';

describe('DiseaseManagementComponent', () => {
  let component: DiseaseManagementComponent;
  let fixture: ComponentFixture<DiseaseManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiseaseManagementComponent]
    });
    fixture = TestBed.createComponent(DiseaseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
