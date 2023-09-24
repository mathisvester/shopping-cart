import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QuantitySelectorComponent } from './quantity-selector.component';

describe('QuantitySelectorComponent', () => {
  let component: QuantitySelectorComponent;
  let fixture: ComponentFixture<QuantitySelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [QuantitySelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
