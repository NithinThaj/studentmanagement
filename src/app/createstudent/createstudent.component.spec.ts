import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestudentComponent } from './createstudent.component';

describe('CreatestudentComponent', () => {
  let component: CreatestudentComponent;
  let fixture: ComponentFixture<CreatestudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatestudentComponent]
    });
    fixture = TestBed.createComponent(CreatestudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
