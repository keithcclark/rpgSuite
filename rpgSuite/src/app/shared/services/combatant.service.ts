import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Monster } from '../classes/monster';

@Injectable({
  providedIn: 'root'
})
export class CombatantService {

  private currentCombatant = new BehaviorSubject(new Monster());
  public combatant = this.currentCombatant.asObservable();

  constructor() { }

  changeCombatant(c: Monster) {
    this.currentCombatant.next(c);
  }
}
