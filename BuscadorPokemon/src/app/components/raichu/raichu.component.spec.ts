import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaichuComponent } from './raichu.component';

describe('RaichuComponent', () => {
  let component: RaichuComponent;
  let fixture: ComponentFixture<RaichuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaichuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaichuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
