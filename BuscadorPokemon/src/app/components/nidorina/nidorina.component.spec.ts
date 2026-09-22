import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NidorinaComponent } from './nidorina.component';

describe('NirodinaComponent', () => {
  let component: NidorinaComponent;
  let fixture: ComponentFixture<NidorinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NidorinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NidorinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
