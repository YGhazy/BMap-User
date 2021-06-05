import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateBankingComponent } from './corporate-banking.component';

describe('CorporateBankingComponent', () => {
  let component: CorporateBankingComponent;
  let fixture: ComponentFixture<CorporateBankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateBankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
