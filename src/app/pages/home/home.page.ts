import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { HoursComponent } from '../../shared/components/hours/hours.component';
import { FeatureComponent } from '../../shared/components/feature/feature.component';

@Component({
  imports: [RouterLink, HoursComponent, FeatureComponent],
  selector: 'app-home',
  styleUrl: './home.page.css',
  templateUrl: './home.page.html',
})
export class HomePage {
  resources = [
    [
      'local_library',
      'Library & book borrowing',
      'Explore English novels, study guides, magazines, and books for curious readers aged 6 and above.',
      'Free reading & borrowing',
      '/membership',
    ],
    [
      'desktop_windows',
      'Computers & Wi-Fi',
      'Access the internet for research and learning. Pick up a computer ticket at reception.',
      'View computer-access hours',
      '/schedule',
    ],
    [
      'forum',
      'Discussion Tables & clubs',
      'Practice English with facilitators and fellow learners in an encouraging, interactive space.',
      'Wednesdays · 3–6 PM',
      '/schedule',
    ],
    [
      'flight_takeoff',
      'EducationUSA advising',
      'Discover the steps to studying in the United States, scholarship opportunities, and TOEFL and GRE resources.',
      'Explore study opportunities',
      '/schedule',
    ],
    [
      'memory',
      'STEM Club',
      'Explore science, technology, engineering, and mathematics with other interested members.',
      'Saturdays · 1–3 PM',
      '/schedule',
    ],
    [
      'radio',
      'ACM Radio Talk Show',
      'Tune in to Radio Université Mahajanga (RUM), FM 89.00 MHz, for the American Corner talk show.',
      'Every other Saturday · 3–3:45 PM',
      '/schedule',
    ],
  ];
}
