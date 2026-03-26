import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Corse } from './corse';

describe('Corse', () => {
  let component: Corse;
  let fixture: ComponentFixture<Corse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Corse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Corse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
