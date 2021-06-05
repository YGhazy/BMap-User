import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IslamicSolutionsComponent } from './islamic-solutions.component';

describe('IslamicSolutionsComponent', () => {
  let component: IslamicSolutionsComponent;
  let fixture: ComponentFixture<IslamicSolutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IslamicSolutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IslamicSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
