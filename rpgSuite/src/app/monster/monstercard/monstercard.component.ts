import { Component, OnInit } from '@angular/core';
import { MonsterService} from 'src/app/shared/services/monster.service';
import { Monster } from 'src/app/shared/classes/monster';
import { CombatantService } from 'src/app/shared/services/combatant.service';

@Component({
  selector: 'app-monstercard',
  templateUrl: './monstercard.component.html',
  styleUrls: ['./monstercard.component.sass']
})
export class MonstercardComponent implements OnInit {

  index = 0;
  creature: Monster;

  constructor(private monsterService: MonsterService,
              private combantService: CombatantService) {
   }

  ngOnInit() {
    this.combantService.combatant.subscribe(c =>{this.creature = c;});
  }

  getMonsterById(id:number){
    this.monsterService.getMonster(id).subscribe(monster => {
      this.creature = monster;
    });
  }
  getMonsterNext(){
    this.index += 1;
    this.monsterService.getMonster(this.index).subscribe(monster => {
      this.creature = monster;
    });
  }
  getMonsterPrev(){
    this.index -= 1;
    if(this.index < 1) {
      this.index = 1;
    }
    this.monsterService.getMonster(this.index).subscribe(monster => {
      this.creature = monster;
    });
  }

  getMod(abilityScore: number) {
    return Math.floor((abilityScore - 10) / 2);
  }
}
