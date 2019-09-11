import { Component, OnInit } from '@angular/core';
import {ChallengeRatingService} from 'src/app/shared/services/challenge-rating.service';
import { Monster } from 'src/app/shared/classes/monster';
import { ChallengeRating } from 'src/app/shared/classes/challenge-rating';

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
  crList = new Array<ChallengeRating>();

  dummy = new Monster();

  constructor(private CRservice: ChallengeRatingService) { }

  ngOnInit() {
    this.CRservice.getCRs().subscribe(c => {
      this.crList = c;
    });
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

  removeAction($event) {
    // console.log('removeAction called');
    this.actionsComponets.splice($event, 1);
  }

  addReaction() {
    this.reactionsComponents.push(this.reactions);
    this.reactions ++;
  }

  removeReaction($event) {
    // console.log('removeReaction called');
    this.reactionsComponents.splice($event, 1);
  }

  addLegendary() {
    this.legendaryComponets.push(this.legendary);
    this.legendary ++;
  }

  removeLegendary($event) {
    // console.log('removeTrait called');
    this.legendaryComponets.splice($event, 1);
  }
}
