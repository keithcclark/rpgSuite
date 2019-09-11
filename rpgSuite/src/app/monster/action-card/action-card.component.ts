import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.sass']
})
export class ActionCardComponent implements OnInit {

  @Input() actionNo: Number;
  @Output() removeAction = new EventEmitter<Number>();

  constructor() { }

  ngOnInit() {
  }

  removeMe() {
    // console.log('removeMe called');
    this.removeAction.emit(this.actionNo);
  }
}
