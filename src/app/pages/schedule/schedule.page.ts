import { Component, DestroyRef, inject, signal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { HoursComponent } from '../../shared/components/hours/hours.component';

@Component({
  imports: [RouterLink, HoursComponent],
  selector: 'app-schedule',
  styleUrl: './schedule.page.css',
  templateUrl: './schedule.page.html',
})
export class SchedulePage {
  readonly now = signal(new Date());
  private readonly weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  constructor() {
    const timer = setInterval(() => this.now.set(new Date()), 60_000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  get today() {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Indian/Antananarivo',
      weekday: 'long',
    }).format(this.now());
  }

  get featuredActivity() {
    const todayIndex = this.weekdays.indexOf(this.today);
    // Choose the first regular club on the nearest scheduled day. The radio
    // broadcast is excluded because its fortnightly dates are not yet known.
    for (let offset = 0; offset < 7; offset++) {
      const day = this.weekdays[(todayIndex + offset) % 7];
      const activity = this.sessions.find((session) => session.weekdays.includes(day));
      if (activity) return activity;
    }
    return undefined;
  }

  get isFeaturedToday() {
    return this.featuredActivity?.weekdays.includes(this.today) ?? false;
  }

  get featuredDay() {
    const todayIndex = this.weekdays.indexOf(this.today);
    for (let offset = 0; offset < 7; offset++) {
      const day = this.weekdays[(todayIndex + offset) % 7];
      if (this.featuredActivity?.weekdays.includes(day)) return day;
    }
    return '';
  }

  filter = signal('All');
  categories = ['All', 'Conversation', 'STEM', 'Sports', 'Kids', 'Radio'];
  sessions = [
    {
      day: 'Wednesday',
      weekdays: ['Wednesday'],
      time: '3:00 PM–6:00 PM',
      title: 'Discussion Tables — Conversation Class',
      category: 'Conversation',
      icon: 'forum',
      image: 'discussion-tables.png',
      location: 'American Corner Mahajanga',
      description:
        'Practice English and share ideas in a friendly conversation class. All levels are welcome.',
    },
    {
      day: 'Monday & Friday',
      weekdays: ['Monday', 'Friday'],
      time: 'Confirm the time with the coordinator',
      title: 'Volleyball Club',
      category: 'Sports',
      icon: 'sports_volleyball',
      image: 'volleyball.jpg',
      location: 'Village Touristique · Sôma Beach',
      description:
        'Meet fellow members for volleyball at the beach. Contact the coordinator for the current meeting time.',
    },
    {
      day: 'Saturday',
      weekdays: ['Saturday'],
      time: '9:00 AM–11:00 AM',
      title: 'Kids Activities & Classes',
      category: 'Kids',
      icon: 'child_care',
      image: 'kids-activities.jpg',
      location: 'American Corner Mahajanga',
      description:
        'A dedicated gathering for children to learn and take part in activities together.',
    },
    {
      day: 'Saturday',
      weekdays: ['Saturday'],
      time: '10:30 AM–11:30 AM',
      title: 'Small Table Talks',
      category: 'Conversation',
      icon: 'groups',
      image: 'small-table-talks.jpg',
      location: 'American Corner Mahajanga',
      description: 'Join a small-group conversation and connect with other members.',
    },
    {
      day: 'Saturday',
      weekdays: ['Saturday'],
      time: '1:00 PM–3:00 PM',
      title: 'STEM Club',
      category: 'STEM',
      icon: 'science',
      image: 'stem-club.jpg',
      location: 'American Corner Mahajanga',
      description:
        'Explore science, technology, engineering, and mathematics with fellow members. Open to all interested members.',
    },
    {
      day: 'Every other Saturday',
      weekdays: [] as string[],
      time: '3:00 PM–3:45 PM',
      title: 'ACM Radio Talk Show',
      category: 'Radio',
      icon: 'radio',
      image: 'radio-talk-show.jpg',
      location: 'Radio Université Mahajanga (RUM) · FM 89.00 MHz',
      description:
        'Tune in to the American Corner radio talk show. Ask the coordinator which Saturday the next broadcast takes place.',
    },
  ];
  get visibleSessions() {
    return this.sessions.filter((s) => this.filter() === 'All' || s.category === this.filter());
  }
}
