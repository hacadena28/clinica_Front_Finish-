import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDoctorComponent } from './sidebar-doctor.component';

describe('SidebarDoctorComponent', () => {
  let component: SidebarDoctorComponent;
  let fixture: ComponentFixture<SidebarDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarDoctorComponent]
    });
    fixture = TestBed.createComponent(SidebarDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
