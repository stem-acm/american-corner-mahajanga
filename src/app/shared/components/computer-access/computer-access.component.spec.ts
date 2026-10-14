import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComputerAccessComponent } from './computer-access.component';

describe('ComputerAccessComponent', () => {
  let component: ComputerAccessComponent;
  let fixture: ComponentFixture<ComputerAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputerAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComputerAccessComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
