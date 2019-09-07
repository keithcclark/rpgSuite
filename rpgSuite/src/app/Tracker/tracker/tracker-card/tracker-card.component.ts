import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tracker-card',
  templateUrl: './tracker-card.component.html',
  styleUrls: ['./tracker-card.component.sass']
})
export class TrackerCardComponent implements OnInit {
  @Input() combatant: object;


  constructor() { }

  ngOnInit() {
  }

}
