import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpsManagementComponent } from './eps-management.component';

describe('EpsManagementComponent', () => {
  let component: EpsManagementComponent;
  let fixture: ComponentFixture<EpsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpsManagementComponent]
    });
    fixture = TestBed.createComponent(EpsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
