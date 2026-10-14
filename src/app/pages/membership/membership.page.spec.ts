import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MembershipPage } from './membership.page';

describe('MembershipPage', () => {
  let component: MembershipPage;
  let fixture: ComponentFixture<MembershipPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MembershipPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('updates document readiness as checkboxes are checked and unchecked', async () => {
    fixture.detectChanges();
    const boxes = fixture.nativeElement.querySelectorAll('input');
    for (const box of boxes) {
      box.click();
      fixture.detectChanges();
    }
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain(
      'Your documents are ready!',
    );
    boxes[0].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain(
      '2 / 3 complete',
    );
  });
});
