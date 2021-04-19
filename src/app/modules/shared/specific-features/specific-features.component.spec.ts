import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificFeaturesComponent } from './specific-features.component';

describe('SpecificFeaturesComponent', () => {
  let component: SpecificFeaturesComponent;
  let fixture: ComponentFixture<SpecificFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
