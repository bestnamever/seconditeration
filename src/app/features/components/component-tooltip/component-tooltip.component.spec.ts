import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTooltipComponent } from './component-tooltip.component';

describe('ComponentTooltipComponent', () => {
  let component: ComponentTooltipComponent;
  let fixture: ComponentFixture<ComponentTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentTooltipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
