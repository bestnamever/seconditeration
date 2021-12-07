import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPhoneshareComponent } from './preview-phoneshare.component';

describe('PreviewPhoneshareComponent', () => {
  let component: PreviewPhoneshareComponent;
  let fixture: ComponentFixture<PreviewPhoneshareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewPhoneshareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPhoneshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
