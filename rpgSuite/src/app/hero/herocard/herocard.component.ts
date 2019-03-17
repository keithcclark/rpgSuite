import { Component, OnInit } from '@angular/core';
import { CombatantService } from 'src/app/shared/services/combatant.service';
import { Monster } from 'src/app/shared/classes/monster';

@Component({
  selector: 'app-herocard',
  templateUrl: './herocard.component.html',
  styleUrls: ['./herocard.component.sass']
})
export class HerocardComponent implements OnInit {
  hero : Monster;
  constructor(private combatantService : CombatantService) { }

  ngOnInit() {
    this.combatantService.combatant.subscribe(c => {
      this.hero = c;
    });
  }

}
