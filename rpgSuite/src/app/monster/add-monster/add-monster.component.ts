import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ChallengeRatingService } from '../../shared/services/challenge-rating.service';
import { AlignmentService } from '../../shared/services/alignment.service';
import { SpeedService } from '../../shared/services/speed.service';
import { SizeService } from '../../shared/services/size.service';
import { LanguageService } from '../../shared/services/language.service';
import { DamageTypeService } from '../../shared/services/damage-type.service';
import { ConditonService } from '../../shared/services/conditon.service';
import { SenseService } from '../../shared/services/sense.service';
import { TypeService } from '../../shared/services/type.service';

import { Monster } from '../../shared/classes/monster';
import { ChallengeRating } from '../../shared/classes/challenge-rating';
import { Alignment } from '../../shared/classes/alignment';
import { Speed } from '../../shared/classes/speed';
import { Size } from '../../shared/classes/size';
import { Language } from '../../shared/classes/language';
import { DamageType } from '../../shared/classes/damage-type';
import { Condition } from '../../shared/classes/condition';
import { Sense } from '../../shared/classes/sense';
import { Type } from '../../shared/classes/type';
import { Trait } from 'src/app/shared/classes/trait';
import { Action } from 'src/app/shared/classes/action';
import { Reaction } from 'src/app/shared/classes/reaction';
import { LegendaryAction } from 'src/app/shared/classes/legendary-action';
import { Environment } from 'src/app/shared/classes/environment';
import { Skill } from 'src/app/shared/classes/skill';
import { CreatureType } from 'src/app/shared/classes/creature-type';
import { Subtype } from 'src/app/shared/classes/subtype';
import { SkillService } from 'src/app/shared/services/skill-service.service';
import { SkillProf } from 'src/app/shared/classes/skill-prof';
import { SavingThrows } from 'src/app/shared/classes/saving-throws';

@Component({
  selector: 'app-add-monster',
  templateUrl: './add-monster.component.html',
  styleUrls: ['./add-monster.component.sass']
})
export class AddMonsterComponent implements OnInit {
  get ExtraTraits() {
    return this.traitFG.get('extraTraits') as FormArray;
  }
  get extraActions() {
    return this.actionFG.get('extraActions') as FormArray;
  }
  get extraReactions() {
    return this.reactionFG.get('extraReactions') as FormArray;
  }
  get extraLegendary() {
    return this.legendaryFG.get('extraLegendary') as FormArray;
  }
  test = false;
  // Imported data for monster features
  crList = new Array<ChallengeRating>();
  alignmentList = new Array<Alignment>();
  speeds = new Array<Speed>();
  speedList = new Array<String>();
  sizeList = new Array<Size>();
  languageList = new Array<Language>();
  damageTypeList = new Array<DamageType>();
  conditionList = new Array<Condition>();
  senses = new Array<Sense>();
  senseList = new Array<String>();
  skillList = new Array<Skill>();
  // ***********************
  // Dropdown settings for multiselect
  alignmentDropdownSettings = {};
  conditionDropdownSettings = {};
  speedDropdownSettings = {};
  sizeDropdownSettings = {};
  damageTypeDropdownSettings = {};
  languageDropdownSettings = {};
  senseDropdownSettings = {};
  typeList = new Array<Type>();
  typeDropdownSettings = {};
  subTypeList = new Array<Subtype>();
  subTypeDropdownSettings = {};
  dropdownSettings = {};
  // *************************
  // Hold moster info
  dummy = new Monster();
  // *************************
  // Form groups for actions
  traitFG = this.formBuilder.group({
    name: [],
    description: [],
    extraTraits: this.formBuilder.array([])
  });
  actionFG = this.formBuilder.group({
    name: [],
    description: [],
    attackBonus: [],
    damageDice: [],
    damageBonus: [],
    extraActions: this.formBuilder.array([])
  });
  reactionFG = this.formBuilder.group({
    name: [],
    description: [],
    extraReactions: this.formBuilder.array([])
  });
  legendaryFG = this.formBuilder.group({
    name: [],
    description: [],
    cost: [],
    extraLegendary: this.formBuilder.array([])
  });
  // ******************************

  constructor(private modalService: NgbModal,
    private CRservice: ChallengeRatingService,
    private alignmentService: AlignmentService,
    private speedService: SpeedService,
    private sizeService: SizeService,
    private languageService: LanguageService,
    private damageTypeService: DamageTypeService,
    private conditionService: ConditonService,
    private senseService: SenseService,
    private typeService: TypeService,
    private skillService: SkillService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.startMonster();
    this.CRservice.getCRs().subscribe(c => {
      this.crList = c;
    });
    this.alignmentService.getAlignments().subscribe(a => {
      this.alignmentList = a;
    });
    this.speedService.getSpeeds().subscribe(s => {
      this.speeds = s;
      this.mangageSpeed();
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
      this.senses = sense;
      this.mangageSense();
    });
    this.typeService.getTypes().subscribe(type => {
      this.typeList = type;
    });
    this.skillService.getSkills().subscribe(skill => {
      this.skillList = skill;
    });
    this.initalizeDropdownSettings();
  }
  getMod(abilityScore: number) {
    return Math.floor((abilityScore - 10) / 2);
  }
  // *****************
  // Add and remove speeds and senses
  // ******************
  openSpeedSenseModal(content: any) {
    this.modalService.open(content);
  }
  // * Speeds *
  // Enable the distance input for editing
  enableSvalue(index: any) {
    const element: any = document.getElementById('sValue' + index);
    // console.log(element);
    element.disabled = false;
  }
  // Disable the distance input after editing
  disableSvalue(index: any) {
    const element: any = document.getElementById('sValue' + index);
    // console.log(element);
    element.disabled = true;

  }
  // Add a new speed to the dummy and thus the table
  addSpeed(movement: string, distance: number) {
    const newSpeed = new Speed;
    newSpeed.speed = movement;
    newSpeed.distance = distance;
    this.dummy.speeds.push(newSpeed);
    this.mangageSpeed();
  }
  // Remove a new speed from the dummy and thus the table
  removeSpeed(index: number) {
    this.dummy.speeds.splice(index, 1);
    // console.log('speed removed');
    this.mangageSpeed();

  }
  // Manage the list of speed name to show only those that havent been selected
  mangageSpeed() {
    const list = new Array<String>();
    this.speeds.forEach(function (speed) {
      // console.log(speed);
      list.push(speed.speed);
    });
    this.dummy.speeds.forEach(function (speed) {
      const index = list.indexOf(speed.speed, 0);
      if (index > -1) {
        list.splice(index, 1);
      }
    });
    this.speedList = list;
    // console.log(this.speedList);

  }
  // * Senses *
  // Enable the distance input for editing
  enableSeValue(index: any) {
    const element: any = document.getElementById('seValue' + index);
    // console.log(element);
    element.disabled = false;
  }
  // Disable the distance input after editing
  disableSeValue(index: any) {
    const element: any = document.getElementById('seValue' + index);
    // console.log(element);
    element.disabled = true;

  }
  // Add a new speed to the dummy and thus the table
  addSense(sense: string, distance: number) {
    const newSense = new Sense;
    newSense.sense = sense;
    newSense.distance = distance;
    this.dummy.senses.push(newSense);
    this.mangageSense();
  }
  // Remove a new speed from the dummy and thus the table
  removeSense(index: number) {
    this.dummy.senses.splice(index, 1);
    // console.log('speed removed');
    this.mangageSense();

  }
  // Manage the list of speed name to show only those that havent been selected
  mangageSense() {
    const list = new Array<String>();
    this.senses.forEach(function (sense) {
      // console.log(speed);
      list.push(sense.sense);
    });
    this.dummy.senses.forEach(function (sense) {
      const index = list.indexOf(sense.sense, 0);
      if (index > -1) {
        list.splice(index, 1);
      }
    });
    this.senseList = list;
    // console.log(this.senseList);

  }


  // ******************
  // Add and Remove traits and actions
  // *******************
  // Traits
  addTrait() {
    this.dummy.traits.push(new Trait());
    // console.log(this.dummy.traits);
    this.ExtraTraits.push(this.formBuilder.control(''));
  }
  removeTrait($event) {
    // console.log('removeTrait called');
    this.dummy.traits.splice($event, 1);
    this.ExtraTraits.removeAt($event);
  }
  getTraitName(index: any, name: any) {
    this.dummy.traits[index].name = name;
  }
  getTraitDesc(index: any, name: any) {
    this.dummy.traits[index].description = name;
  }
  // Actions
  addAction() {
    this.dummy.actions.push(new Action());
    this.extraActions.push(this.formBuilder.control(''));
  }
  removeAction($event) {
    // console.log('removeAction called');
    this.dummy.actions.splice($event, 1);
    this.extraActions.removeAt($event);
  }
  getActionName(index: any, name: any) {
    this.dummy.actions[index].name = name;
  }
  getActionDesc(index: any, name: any) {
    this.dummy.actions[index].description = name;
  }
  getActionAttackBonus(index: any, bonus: any) {
    this.dummy.actions[index].attackBonus = bonus;
  }
  getActionDamageDice(index: any, dice: any) {
    this.dummy.actions[index].damageDice = dice;
  }
  getActionDamageBonus(index: any, bonus: any) {
    this.dummy.actions[index].damageBonus = bonus;
  }
  // Reactions
  addReaction() {
    this.dummy.reactions.push(new Reaction());
    this.extraReactions.push(this.formBuilder.control(''));
  }
  removeReaction(index: number) {
    // console.log('removeReaction called');
    this.dummy.reactions.splice(index, 1);
    this.extraReactions.removeAt(index);
  }
  getReactionName(index: any, name: any) {
    this.dummy.reactions[index].name = name;
  }
  getReactionDesc(index: any, desc: any) {
    this.dummy.reactions[index].description = desc;
  }
  // Legendary
  addLegendary() {
    this.dummy.legendaryActions.push(new LegendaryAction());
    this.extraLegendary.push(this.formBuilder.control(''));
  }
  removeLegendary(index: number) {
    // console.log('removeTrait called');
    this.dummy.legendaryActions.splice(index, 1);
    this.extraLegendary.removeAt(index);
  }
  getLegendaryName(index: any, name: any) {
    this.dummy.legendaryActions[index].name = name;
  }
  getLegendaryDesc(index: any, desc: any) {
    this.dummy.legendaryActions[index].description = desc;
  }
  getLegendaryCost(index: any, cost: any) {
    this.dummy.legendaryActions[index].cost = cost;
  }
  // ************************
  // ************************
  // skills
  manageSkills(skill: Skill, checked: any) {
    const tempSkill = new SkillProf;
    let tempBonus = 0;
    tempSkill.skills = skill;
    if (checked.checked) {
      switch (skill.main_stat) {
        case 'Strength':
          tempBonus = this.getMod(this.dummy.strength);
          break;
        case 'Dexterity':
          tempBonus = this.getMod(this.dummy.dexterity);
          break;
        case 'Constitution':
          tempBonus = this.getMod(this.dummy.constitution);
          break;
        case 'Intelligence':
          tempBonus = this.getMod(this.dummy.intelligence);
          break;
        case 'Wisdom':
          tempBonus = this.getMod(this.dummy.wisdom);
          break;
        case 'Charisma':
          tempBonus = this.getMod(this.dummy.charisma);
          break;
      }
      tempBonus += this.dummy.challenge_rating.prof_bonus;
      tempSkill.bonus = tempBonus;
      this.dummy.skills.push(tempSkill);
    } else {
      let i: number;
      for (i = 0; i < this.dummy.skills.length; i++) {
        if (this.dummy.skills[i].skills.name == tempSkill.skills.name) {
          this.dummy.skills.splice(i);
          break;
        }
      }
    }
  }
  // saving throws
  manageSavingThrows(save: string, checked: any) {
    const tempSave = new SavingThrows;
    tempSave.stat = save;
    if (checked.checked) {
      switch (save) {
        case 'STR':
          tempSave.modifier = this.getMod(this.dummy.strength) + this.dummy.challenge_rating.prof_bonus;
          break;
        case 'DEX':
          tempSave.modifier = this.getMod(this.dummy.dexterity) + this.dummy.challenge_rating.prof_bonus;
          break;
        case 'CON':
          tempSave.modifier = this.getMod(this.dummy.constitution) + this.dummy.challenge_rating.prof_bonus;
          break;
        case 'INT':
          tempSave.modifier = this.getMod(this.dummy.intelligence) + this.dummy.challenge_rating.prof_bonus;
          break;
        case 'WIS':
          tempSave.modifier = this.getMod(this.dummy.wisdom) + this.dummy.challenge_rating.prof_bonus;
          break;
        case 'CHR':
          tempSave.modifier = this.getMod(this.dummy.charisma) + this.dummy.challenge_rating.prof_bonus;
          break;
      }
      this.dummy.savingThrows.push(tempSave);
    } else {
      let i: number;
      for (i = 0; i < this.dummy.savingThrows.length; i++) {
        if (this.dummy.savingThrows[i].stat == tempSave.stat) {
          this.dummy.savingThrows.splice(i);
          break;
        }
      }
    }

  }
  fillCR(prof: number, xp: number) {
    this.dummy.challenge_rating.prof_bonus = prof;
    this.dummy.challenge_rating.xp = xp;
  }

  // set list of subtypes based on selected type
  getSubTypeList(id: any) {
    this.subTypeList = this.typeList[id.id - 1].subtypes;
  }
  // Initalize all the dropdown settings.
  // Single Select, idField, and textField are the main points.
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
    };
    this.senseDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'sense',
      allowSearchFilter: false,
      searchPlaceholderText: 'Search',
      enableCheckAll: false,
      maxHeight: 500
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
      singleSelection: true,
      idField: 'id',
      textField: 'speed',
      allowSearchFilter: false,
      searchPlaceholderText: 'Search',
      enableCheckAll: false,
      maxHeight: 500
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
    this.dummy.creature_subtype = new Subtype();
    this.dummy.alignment = new Alignment();
    this.dummy.creature_size = new Size();
    this.dummy.languages = new Array<Language>();
    this.dummy.traits = new Array<Trait>();
    this.dummy.actions = new Array<Action>();
    this.dummy.reactions = new Array<Reaction>();
    this.dummy.legendaryActions = new Array<LegendaryAction>();
    this.dummy.environments = new Array<Environment>();
    this.dummy.damageVulnerability = new Array<DamageType>();
    this.dummy.damageResistance = new Array<DamageType>();
    this.dummy.damageImmunity = new Array<DamageType>();
    this.dummy.conditionImmunity = new Array<Condition>();
    this.dummy.savingThrows = new Array<SavingThrows>();
    this.dummy.senses = new Array<Sense>();
    this.dummy.senses[0] = new Sense();
    this.dummy.senses[0].id = 0;
    this.dummy.senses[0].sense = 'Passive Perception';
    this.dummy.speeds = new Array<Speed>();
    this.dummy.speeds[0] = new Speed();
    this.dummy.speeds[0].id = 1;
    this.dummy.speeds[0].speed = 'Speed';
    this.dummy.speeds[0].distance = 0;
    this.dummy.skills = new Array<SkillProf>();
  }

}
