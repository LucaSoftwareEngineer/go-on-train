import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorseAggiungi } from './corse-aggiungi';

describe('CorseAggiungi', () => {
  let component: CorseAggiungi;
  let fixture: ComponentFixture<CorseAggiungi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorseAggiungi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorseAggiungi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
