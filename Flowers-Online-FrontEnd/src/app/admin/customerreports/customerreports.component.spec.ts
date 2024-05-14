import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerreportsComponent } from './customerreports.component';

describe('CustomerreportsComponent', () => {
  let component: CustomerreportsComponent;
  let fixture: ComponentFixture<CustomerreportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerreportsComponent]
    });
    fixture = TestBed.createComponent(CustomerreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
