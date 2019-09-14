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
import { Trait } from 'src/app/shared/classes/trait';
import { Action } from 'src/app/shared/classes/action';
import { Reaction } from 'src/app/shared/classes/reaction';
import { LegendaryAction } from 'src/app/shared/classes/legendary-action';
import { Environment } from 'src/app/shared/classes/environment';
import { Skill } from 'src/app/shared/classes/skill';
import { CreatureType } from 'src/app/shared/classes/creature-type';
import { Subtype } from 'src/app/shared/classes/subtype';

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
  alignmentDropdownSettings = {};
  speedList = new Array<Speed>();
  speedDropdownSettings = {};
  sizeList = new Array<Size>();
  sizeDropdownSettings = {};
  languageList = new Array<Language>();
  languageDropdownSettings = {};
  damageTypeList = new Array<DamageType>();
  damageTypeDropdownSettings = {};
  conditionList = new Array<Condition>();
  conditionDropdownSettings = {};
  senseList = new Array<Sense>();
  senseDropdownSettings = {};
  typeList = new Array<Type>();
  typeDropdownSettings = {};
  subTypeList = new Array<Subtype>();
  subTypeDropdownSettings = {};
  dropdownSettings = {};

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
    this.initalizeDropdownSettings();
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
  getSubTypeList(id: any) {
    this.subTypeList = this.typeList[id.id - 1].subtypes;
  }

  initalizeDropdownSettings() {
    this.alignmentDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'alignment',
      allowSearchFilter: true,
      searchPlaceholderText: 'Search',
      enableCheckAll: false,
      maxHeight: 100
    };
    this.conditionDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      searchPlaceholderText: 'Search',
      enableCheckAll: false,
      maxHeight: 100
    };
    this.damageTypeDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      searchPlaceholderText: 'Search',
      enableCheckAll: false,
      maxHeight: 100
    };
    this.languageDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      searchPlaceholderText: 'Search',
      enableCheckAll: false,
      maxHeight: 100
    }
    this.senseDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'sense',
      allowSearchFilter: true,
      searchPlaceholderText: 'Search',
      enableCheckAll: false,
      maxHeight: 100
    };
    this.sizeDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'creature_size',
      allowSearchFilter: true,
      searchPlaceholderText: 'Search',
      enableCheckAll: false,
      maxHeight: 100,
    };
    this.speedDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'speed',
      allowSearchFilter: true,
      searchPlaceholderText: 'Search',
      enableCheckAll: false,
      maxHeight: 100
    };
    this.subTypeDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'type',
      allowSearchFilter: true,
      searchPlaceholderText: 'Search',
      enableCheckAll: false,
      maxHeight: 100,
      noDataAvailablePlaceholderTex: 'No Subtypes'
    };
    this.typeDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'type',
      allowSearchFilter: true,
      searchPlaceholderText: 'Search',
      enableCheckAll: false,
      maxHeight: 100
    };
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
    this.dummy.creature_type = new CreatureType();
    this.dummy.creature_type.subtype = new Subtype();
    this.dummy.alignment = new Alignment();
    this.dummy.creature_size = new Size();
    this.dummy.languages = new Array<Language>();
    this.dummy.traits = new Array<Trait>();
    this.dummy.traits[0] = new Trait();
    this.dummy.actions = new Array<Action>();
    this.dummy.reactions = new Array<Reaction>();
    this.dummy.legendaryActions = new Array<LegendaryAction>();
    this.dummy.environments = new Array<Environment>();
    this.dummy.damageVulnerability = new Array<DamageType>();
    this.dummy.damageResistance = new Array<DamageType>();
    this.dummy.damageImmunity = new Array<DamageType>();
    this.dummy.conditionImmunity = new Array<Condition>();
    this.dummy.senses = new Array<Sense>();
    this.dummy.senses[0] = new Sense();
    this.dummy.senses[0].id = 0;
    this.dummy.senses[0].sense = 'Passive Perception';
    this.dummy.speeds = new Array<Speed>();
    this.dummy.speeds[0] = new Speed();
    this.dummy.speeds[0].id = 1;
    this.dummy.speeds[0].speed = 'Speed';
    this.dummy.skills = new Array<Skill>();
  }
}
