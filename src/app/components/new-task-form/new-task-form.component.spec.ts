import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskFormComponent } from './new-task-form.component';

describe('NewTaskModalComponent', () => {
  let component: NewTaskFormComponent;
  let fixture: ComponentFixture<NewTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaskFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
