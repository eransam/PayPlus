import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersManagementComponent } from './customers-management.component';

describe('CustomersManagementComponent', () => {
  let component: CustomersManagementComponent;
  let fixture: ComponentFixture<CustomersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
