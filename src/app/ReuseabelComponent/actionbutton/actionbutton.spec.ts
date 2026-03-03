import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actionbutton } from './actionbutton';

describe('Actionbutton', () => {
  let component: Actionbutton;
  let fixture: ComponentFixture<Actionbutton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actionbutton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actionbutton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
