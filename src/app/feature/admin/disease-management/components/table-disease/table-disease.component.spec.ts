import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDiseaseComponent } from './table-disease.component';

describe('TableDiseaseComponent', () => {
  let component: TableDiseaseComponent;
  let fixture: ComponentFixture<TableDiseaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableDiseaseComponent]
    });
    fixture = TestBed.createComponent(TableDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
