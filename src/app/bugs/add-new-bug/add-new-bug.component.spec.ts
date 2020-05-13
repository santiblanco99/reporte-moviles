import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBugComponent } from './add-new-bug.component';

describe('AddNewBugComponent', () => {
  let component: AddNewBugComponent;
  let fixture: ComponentFixture<AddNewBugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
