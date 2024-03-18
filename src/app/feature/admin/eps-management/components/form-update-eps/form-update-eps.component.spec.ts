import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateEpsComponent } from './form-update-eps.component';

describe('FormCreateEpsComponent', () => {
  let component: FormUpdateEpsComponent;
  let fixture: ComponentFixture<FormUpdateEpsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUpdateEpsComponent]
    });
    fixture = TestBed.createComponent(FormUpdateEpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
