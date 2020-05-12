import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventualConnectivityComponent } from './eventual-connectivity.component';

describe('EventualConnectivityComponent', () => {
  let component: EventualConnectivityComponent;
  let fixture: ComponentFixture<EventualConnectivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventualConnectivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventualConnectivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
