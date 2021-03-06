import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CombatantService } from 'src/app/shared/services/combatant.service';
import { MonsterService } from 'src/app/shared/services/monster.service';
import { Monster } from '../../shared/classes/monster';
@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.sass']
})
export class TrackerComponent implements OnInit {

  combatants: Array<Monster> = new Array<Monster>();
  searchResults: Array<Monster>;
  selector: string;

  // ************/
  // for initiative round tracking
  // ************/
  cycle = 0;
  round = 1;

  // ************/
  // for adjusting hp of creature in initiative queue
  // ************/
  adjustingHP: number;
  adjustCreature: Monster;
  adjustMaxHP: number;
  lastpopOver: any;

  constructor(private modalService: NgbModal,
    private monsterService: MonsterService,
    private combatantService: CombatantService) { }

  ngOnInit() {
  }
  // ********************/
  // Initiative List Functions
  // *******************/
  // add monster to the initiative list
  enterMonsterCombatant(id: number) {
    // create new monster
    let combatant: Monster;
    // get new monster
    this.monsterService.getMonster(id).subscribe(c => {
      combatant = c;
      combatant.faction = 'Enemy';
      // sort senses to passive perception to front to be easily displayed
      combatant.senses.sort((a: any, b: any) => (a.sense.id > b.sense.id ? 1 : -1));
      // roll die for initiative
      const roll = Math.round(Math.random() * 19) + 1;
      // calculate dex mod and add to roll
      combatant.initiative = Math.floor((combatant.dexterity - 10) / 2) + roll;
      // set the hit point pool to be used in combat to average value
      combatant.combathp = combatant.hit_points;
      // add combatant to array of combatants.
      this.combatants.push(combatant);
      // sort the array combatants with the highest in the 0 spot
      this.combatants.sort((a, b) => (a.initiative > b.initiative ? -1 : 1));
      this.displayCombatant(this.combatants[0]);
    });


  }
  enterPlayerCombatant(form: NgForm) {
    const combatant = new Monster;
    combatant.faction = 'Hero';
    combatant.name = form.value.name;
    combatant.hit_points = form.value.hp;
    combatant.combathp = combatant.hit_points;
    combatant.armor_class = form.value.ac;
    combatant.dexterity = Math.round((form.value.iniBonus * 2) + 10);
    const sight: any = {
      'id': 1,
      'Sense': {
        'id': 1,
        'sense': 'Passive Perception',
        'description': null
      },
      'distance': form.value.perception
    };

    combatant.senses.push(sight);
    console.log(combatant);
    const roll = Math.round(Math.random() * 19) + 1;
    // calculate dex mod and add to roll
    combatant.initiative = Math.floor((combatant.dexterity - 10) / 2) + roll;
    this.combatants.push(combatant);
    // sort the array combatants with the highest in the 0 spot
    this.combatants.sort((a, b) => (a.initiative > b.initiative ? -1 : 1));
    this.displayCombatant(this.combatants[0]);


  }
  cycleForward() {
    this.cycle++;
    if (this.cycle >= this.combatants.length) {
      this.round++;
      this.cycle = 0;
    }
    const temp = this.combatants.shift();
    this.combatants.push(temp);
    this.displayCombatant(this.combatants[0]);
  }
  cycleBackward() {
    if (this.round === 1 && this.cycle <= 1) {
    } else {

      if (this.round < 1) {
        this.round = 1;
        this.cycle = 0;
      } else {
        this.cycle--;
      }
      if (this.cycle < 1) {
        this.round--;
        this.cycle = this.combatants.length;
      }
      const temp = this.combatants.pop();
      this.combatants.unshift(temp);
      this.displayCombatant(this.combatants[0]);
    }
  }
  // display info on the combatant selected from the initiative list
  displayCombatant(combatant: Monster) {
    this.combatantService.changeCombatant(combatant);
  }
  // ********************/
  // Modal Functions
  // *******************/
  // Modal Open
  openAdd(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
  // searching
  searchMonsterByName(name: string) {
    this.monsterService.searchName(name).subscribe(monsters => {
      this.searchResults = monsters;
    });
  }
  // ********************/
  // Popover Functions
  // *******************/
  // open the popover to adjust the hp of a combatant
  openHpPopover(popover: any, creature: Monster) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      this.adjustingHP = creature.combathp;
      this.adjustCreature = creature;
      this.adjustMaxHP = creature.hit_points;
      this.lastpopOver = popover;
      const hp = this.adjustingHP;
      popover.open({ hp });
    }
  }
  // change the hp of selected combatant
  setCombatantHP(setValue: number) {
    this.adjustCreature.combathp = setValue;
    this.lastpopOver.close();
  }
  validateHPentered(newHP: any) {
    if (+newHP.value > +newHP.max) {
      newHP.value = newHP.max;
    }
  }


}
