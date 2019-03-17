import { Component, OnInit } from '@angular/core';
import { CombatantService } from 'src/app/shared/services/combatant.service';
import {Monster} from '../../shared/classes/monster'

@Component({
  selector: 'app-trackerframe',
  templateUrl: './trackerframe.component.html',
  styleUrls: ['./trackerframe.component.sass']
})
export class TrackerframeComponent implements OnInit {
  combatant : Monster;

  constructor(private combatantService:CombatantService) { }

  ngOnInit() {
    this.combatantService.combatant.subscribe(c =>{
      this.combatant = c;
    })
  }

}