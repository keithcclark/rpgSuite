import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reaction-card',
  templateUrl: './reaction-card.component.html',
  styleUrls: ['./reaction-card.component.sass']
})
export class ReactionCardComponent implements OnInit {

  @Input() reactionNo: Number;
  @Output() removeReaction = new EventEmitter<Number>();

  constructor() { }

  ngOnInit() {
  }

  removeMe() {
    //console.log('removeMe called');
    this.removeReaction.emit(this.reactionNo);
  }
}
