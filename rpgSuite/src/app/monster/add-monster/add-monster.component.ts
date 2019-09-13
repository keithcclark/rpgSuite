import { Component, OnInit } from '@angular/core';

import {ChallengeRatingService} from '../../shared/services/challenge-rating.service';
import {AlignmentService} from '../../shared/services/alignment.service';
import {SpeedService} from '../../shared/services/speed.service';
import {SizeService} from '../../shared/services/size.service';
import {LanguageService} from '../../shared/services/language.service';
import {DamageTypeService} from '../../shared/services/damage-type.service';
import {ConditonService} from '../../shared/services/conditon.service';
import {SenseService} from '../../shared/services/sense.service';
import {TypeService} from '../../shared/services/type.service';

import { Monster } from '../../shared/classes/monster';
import { ChallengeRating } from '../../shared/classes/challenge-rating';
import {Alignment} from '../../shared/classes/alignment';
import {Speed} from '../../shared/classes/speed';
import {Size} from '../../shared/classes/size';
import {Language} from '../../shared/classes/language';
import {DamageType} from '../../shared/classes/damage-type';
import {Condition} from '../../shared/classes/condition';
import {Sense} from '../../shared/classes/sense';
import {Type} from '../../shared/classes/type';

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
  typeList = new Array<Type>();
  subTypeList = new Array<Type>();

  dummy = new Monster();

  constructor(private CRservice: ChallengeRatingService,
    private alignmentService: AlignmentService,
    private speedService: SpeedService,
    private sizeService: SizeService,
    private languageService: LanguageService,
    private damageTypeService: DamageTypeService,
    private conditionService: ConditonService,
    private senseService: SenseService,
    private typeService: TypeService) { }

  ngOnInit() {
    this.startMonster();
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
    this.typeService.getTypes().subscribe(type => {
      this.typeList = type;
    });
  }

  // ******************
  // Add and Remove traits and actions
  // *******************
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
  // ************************
  // ************************

  // set list of subtypes based on selected type
  getSubTypeList(id: number) {
    this.subTypeList = this.typeList[id - 1].subtypes;
  }

  // Intialize blank monster
  startMonster() {
    this.dummy.name = '';
    this.dummy.strength = 0;
    this.dummy.dexterity = 0;
    this.dummy.constitution = 0;
    this.dummy.intelligence = 0;
    this.dummy.wisdom = 0;
    this.dummy.charisma = 0;
    this.dummy.armor_class = 0;
    this.dummy.hit_points = 0;
    this.dummy.hit_dice = '';
    this.dummy.challenge_rating = new ChallengeRating();
    this.dummy.creature_type = new Type();
    this.dummy.creature_type.id = 0;
  }
}
