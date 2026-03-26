import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prenotazioni } from './prenotazioni';

describe('Prenotazioni', () => {
  let component: Prenotazioni;
  let fixture: ComponentFixture<Prenotazioni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prenotazioni]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Prenotazioni);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
