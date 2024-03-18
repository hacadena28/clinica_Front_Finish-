import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEpsComponent } from './table-eps.component';

describe('TableEpsComponent', () => {
  let component: TableEpsComponent;
  let fixture: ComponentFixture<TableEpsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableEpsComponent]
    });
    fixture = TestBed.createComponent(TableEpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
