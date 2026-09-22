import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VulpixComponent } from './vulpix.component';

describe('VulpixComponent', () => {
  let component: VulpixComponent;
  let fixture: ComponentFixture<VulpixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VulpixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VulpixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
