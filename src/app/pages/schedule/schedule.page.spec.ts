import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SchedulePage } from './schedule.page';

describe('SchedulePage', () => {
  let component: SchedulePage;
  let fixture: ComponentFixture<SchedulePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulePage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('filters the schedule and restores all activities', async () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('article').length).toBe(6);
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('article').length).toBe(2);
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain(
      'Conversation',
    );
    buttons[0].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('article').length).toBe(6);
  });
  it.each([
    ['2026-10-12T09:00:00Z', 'Monday', 'Volleyball Club', true, 'Monday'],
    [
      '2026-10-13T09:00:00Z',
      'Tuesday',
      'Discussion Tables — Conversation Class',
      false,
      'Wednesday',
    ],
    [
      '2026-10-14T09:00:00Z',
      'Wednesday',
      'Discussion Tables — Conversation Class',
      true,
      'Wednesday',
    ],
    ['2026-10-15T09:00:00Z', 'Thursday', 'Volleyball Club', false, 'Friday'],
    ['2026-10-16T09:00:00Z', 'Friday', 'Volleyball Club', true, 'Friday'],
    ['2026-10-17T09:00:00Z', 'Saturday', 'Kids Activities & Classes', true, 'Saturday'],
    ['2026-10-18T09:00:00Z', 'Sunday', 'Volleyball Club', false, 'Monday'],
  ])('selects the correct highlight for %s', (date, day, title, isToday, featuredDay) => {
    component.now.set(new Date(date));
    fixture.detectChanges();
    expect(component.today).toBe(day);
    expect(component.featuredActivity?.title).toBe(title);
    expect(component.isFeaturedToday).toBe(isToday);
    expect(component.featuredDay).toBe(featuredDay);
    expect(fixture.nativeElement.querySelector('#featured-heading').textContent).toContain(title);
    expect(fixture.nativeElement.querySelector('figure img').getAttribute('src')).toBe(
      '/images/' + component.featuredActivity?.image,
    );
  });

  it('switches the highlight at midnight in Mahajanga rather than UTC', () => {
    component.now.set(new Date('2026-10-16T20:59:00Z'));
    expect(component.today).toBe('Friday');
    expect(component.featuredActivity?.title).toBe('Volleyball Club');
    component.now.set(new Date('2026-10-16T21:00:00Z'));
    expect(component.today).toBe('Saturday');
    expect(component.featuredActivity?.title).toBe('Kids Activities & Classes');
  });

  it('keeps the daily highlight independent of calendar filters', () => {
    component.now.set(new Date('2026-10-17T09:00:00Z'));
    component.filter.set('Radio');
    expect(component.visibleSessions.length).toBe(1);
    expect(component.featuredActivity?.title).toBe('Kids Activities & Classes');
  });
});
