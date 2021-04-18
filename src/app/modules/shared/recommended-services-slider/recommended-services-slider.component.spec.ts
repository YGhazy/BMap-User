import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedServicesSliderComponent } from './recommended-services-slider.component';

describe('RecommendedServicesSliderComponent', () => {
  let component: RecommendedServicesSliderComponent;
  let fixture: ComponentFixture<RecommendedServicesSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedServicesSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedServicesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
