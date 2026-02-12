import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonBouton } from './mon-bouton';

describe('MonBouton', () => {
  let component: MonBouton;
  let fixture: ComponentFixture<MonBouton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonBouton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonBouton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
