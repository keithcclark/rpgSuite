import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-monster',
  templateUrl: './add-monster.component.html',
  styleUrls: ['./add-monster.component.sass']
})
export class AddMonsterComponent implements OnInit {
  traitsComponents = [];
  traits = 0;
  actionsComponets = [];
  actions = 0;
  reactionsComponents = [];
  reactions = 0;
  legendaryComponets = [];
  legendary = 0;
  constructor() { }

  ngOnInit() {
  }

  addTrait() {
    this.traitsComponents.push(this.traits);
    this.traits ++;
  }

  removeTrait($event) {
    // console.log('removeTrait called');
    this.traitsComponents.splice($event, 1);
  }

  addAction() {
    this.actionsComponets.push(this.actions);
    this.actions ++;
  }
  addReaction() {
    this.reactionsComponents.push(this.reactions);
    this.reactions ++;
  }
  addLegendary() {
    this.legendaryComponets.push(this.legendary);
    this.legendary ++;
  }
}
