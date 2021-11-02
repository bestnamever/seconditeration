import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LittestingComponent } from './littesting.component';

describe('LittestingComponent', () => {
  let component: LittestingComponent;
  let fixture: ComponentFixture<LittestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LittestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LittestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
