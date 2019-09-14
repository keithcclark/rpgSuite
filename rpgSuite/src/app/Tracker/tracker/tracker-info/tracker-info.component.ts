import { Component, OnInit, Input } from '@angular/core';
import { Monster } from '../../../shared/classes/monster';

@Component({
  selector: 'app-tracker-info',
  templateUrl: './tracker-info.component.html',
  styleUrls: ['./tracker-info.component.sass']
})
export class TrackerInfoComponent implements OnInit {
  @Input() combatant: object;
    // ************/
  // for adjusting stats of creature in initiative queue
  // ************/
  adjustCreature: Monster;
  lastpopOver: any;
  // hp
  adjustingHP: Number;
  overMaxHP: boolean;
  // ac
  adjustingAC: Number;
  overMaxAC: boolean;
  // passive perception
  adjustingPP: Number;
  overMaxPP: boolean;

  constructor() { }

  ngOnInit() {
  }

    // ********************/
  // Popover Functions
  // *******************/
  // *********** HP ***********/
  // open the popover to adjust the hp of a combatant
  openHpPopover(popover: any, creature: Monster) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      this.adjustingHP = creature.combathp;
      this.adjustCreature = creature;
      this.lastpopOver = popover;
      const hp = this.adjustingHP;
      popover.open({ hp });
    }
  }
  // change the hp of selected combatant
  setCombatantHP(setValue: number) {
    this.adjustCreature.combathp = setValue;
    // check to see if hp is over max value
    if (+setValue > +this.adjustCreature.hit_points) {
      this.overMaxHP = true;
    } else {
      this.overMaxHP = false;
    }
  }
  // *********** AC ***********/
  // open the popover to adjust the ac of a combatant
  openAcPopover(popover: any, creature: Monster) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      this.adjustingAC = creature.combatac;
      this.adjustCreature = creature;
      this.lastpopOver = popover;
      const ac = this.adjustingAC;
      popover.open({ ac });
    }
  }
  // change the ac of selected combatant
  setCombatantAC(setValue: number) {
    this.adjustCreature.combatac = setValue;
    // check to see if ac is over max value
    if (+setValue > this.adjustCreature.armor_class) {
      this.overMaxAC = true;
    } else {
      this.overMaxAC = false;
    }
  }
  // *********** Passive Perception ***********/
  // open the popover to adjust the passive perception of a combatant
  openPpPopover(popover: any, creature: Monster) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      this.adjustingPP = creature.combatpp;
      this.adjustCreature = creature;
      this.lastpopOver = popover;
      const pp = this.adjustingPP;
      popover.open({ pp });
    }
  }
  // change the passive perception of selected combatant
  setCombatantPP(setValue: number) {
    this.adjustCreature.combatpp = setValue;
    // check to see if ac is over max value
    if (+setValue > this.adjustCreature.senses[0].distance) {
      this.overMaxPP = true;
    } else {
      this.overMaxPP = false;
    }
  }

}
