import { Component, signal } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-membership',
  styleUrl: './membership.page.css',
  templateUrl: './membership.page.html',
})
export class MembershipPage {
  checked = signal<boolean[]>([false, false, false]);
  toggle(index: number) {
    this.checked.update((values) => values.map((v, i) => (i === index ? !v : v)));
  }
  get count() {
    return this.checked().filter(Boolean).length;
  }
  documents = [
    [
      'photo_camera',
      'ID photographs',
      '2 recent photos',
      'Bring two recent passport-style photographs for your registration record and membership card.',
    ],
    [
      'domain',
      'Residence certificate',
      '1 official certificate',
      'Bring a residence certificate issued by your local Fokontany in Mahajanga.',
    ],
    [
      'badge',
      'Identity document',
      '1 readable copy',
      'Adults must bring a copy of their national identity card (CIN). Ask the coordinator about requirements for children.',
    ],
  ];
  rules = [
    [
      'how_to_reg',
      'Check in at reception',
      'Leave your bag at reception. Sign the visitor register every time you enter.',
    ],
    [
      'computer',
      'Computer use',
      'Collect a computer ticket before use. Ask the coordinator for passwords or help.',
    ],
    [
      'no_food',
      'No food, drinks, or smoking',
      'Food, drinks, smoking, and vaping are not allowed inside the Corner.',
    ],
    [
      'handshake',
      'Respect the space & others',
      'Be kind and inclusive. Keep noise low and leave the area clean.',
    ],
    [
      'shelves',
      'Handle materials with care',
      'Return books, games, and equipment after use. Treat electronics responsibly.',
    ],
  ];
}
