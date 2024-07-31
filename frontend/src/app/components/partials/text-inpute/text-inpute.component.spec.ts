import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputeComponent } from './text-inpute.component';

describe('TextInputeComponent', () => {
  let component: TextInputeComponent;
  let fixture: ComponentFixture<TextInputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextInputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
