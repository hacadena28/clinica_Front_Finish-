import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateEpsComponent } from './form-create-eps.component';

describe('FormCreateEpsComponent', () => {
  let component: FormCreateEpsComponent;
  let fixture: ComponentFixture<FormCreateEpsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateEpsComponent]
    });
    fixture = TestBed.createComponent(FormCreateEpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
