import { Component, OnInit } from '@angular/core';

import {ChallengeRatingService} from 'src/app/shared/services/challenge-rating.service';
import {AlignmentService} from 'src/app/shared/services/alignment.service';
import {SpeedService} from '../../shared/services/speed.service';
import {SizeService} from '../../shared/services/size.service';
import {LanguageService} from '../../shared/services/language.service';
import {DamageTypeService} from '../../shared/services/damage-type.service';
import {ConditonService} from '../../shared/services/conditon.service';
import {SenseService} from '../../shared/services/sense.service';

import { Monster } from 'src/app/shared/classes/monster';
import { ChallengeRating } from 'src/app/shared/classes/challenge-rating';
import {Alignment} from '../../shared/classes/alignment';
import {Speed} from '../../shared/classes/speed';
import {Size} from '../../shared/classes/size';
import {Language} from '../../shared/classes/language';
import {DamageType} from '../../shared/classes/damage-type';
import {Condition} from '../../shared/classes/condition';
import {Sense} from '../../shared/classes/sense';

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
  alignmentList = new Array<Alignment>();
  speedList = new Array<Speed>();
  sizeList = new Array<Size>();
  languageList = new Array<Language>();
  damageTypeList = new Array<DamageType>();
  conditionList = new Array<Condition>();
  senseList = new Array<Sense>();

  dummy = new Monster();

  constructor(private CRservice: ChallengeRatingService,
    private alignmentService: AlignmentService,
    private speedService: SpeedService,
    private sizeService: SizeService,
    private languageService: LanguageService,
    private damageTypeService: DamageTypeService,
    private conditionService: ConditonService,
    private senseService: SenseService) { }

  ngOnInit() {
    this.CRservice.getCRs().subscribe(c => {
      this.crList = c;
    });
    this.alignmentService.getAlignments().subscribe(a => {
      this.alignmentList = a;
    });
    this.speedService.getSpeeds().subscribe(s => {
      this.speedList = s;
    });
    this.sizeService.getSizes().subscribe(size => {
      this.sizeList = size;
    });
    this.languageService.getLanguages().subscribe(l => {
      this.languageList = l;
    });
    this.damageTypeService.getDamageTypes().subscribe(dt => {
      this.damageTypeList = dt;
    });
    this.conditionService.getConditions().subscribe(con => {
      this.conditionList = con;
    });
    this.senseService.getSenses().subscribe(sense => {
      this.senseList = sense;
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
