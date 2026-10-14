import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HoursComponent } from './hours.component';

describe('HoursComponent', () => {
  let component: HoursComponent;
  let fixture: ComponentFixture<HoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoursComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HoursComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
