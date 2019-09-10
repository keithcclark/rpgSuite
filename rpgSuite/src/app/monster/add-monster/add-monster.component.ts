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
    console.log(this.traitsComponents);
    this.traits ++;
  }

  addAction() {
    this.actionsComponets.push(this.actions);
    console.log(this.actionsComponets);
    this.actions ++;
  }
  addReaction() {
    this.reactionsComponents.push(this.reactions);
    console.log(this.reactionsComponents);
    this.reactions ++;
  }
  addLegendary() {
    this.legendaryComponets.push(this.legendary);
    console.log(this.legendaryComponets);
    this.legendary ++;
  }
}
