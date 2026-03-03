import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionComponents } from './transaction-components';

describe('TransactionComponents', () => {
  let component: TransactionComponents;
  let fixture: ComponentFixture<TransactionComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
