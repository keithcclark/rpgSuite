import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trait-card',
  templateUrl: './trait-card.component.html',
  styleUrls: ['./trait-card.component.sass']
})
export class TraitCardComponent implements OnInit {
  @Input() traitNo: Number;
  @Output() removeTrait = new EventEmitter<Number>();

  constructor() { }

  ngOnInit() {
  }

  removeMe() {
    // console.log('removeMe called');
    this.removeTrait.emit(this.traitNo);
  }
}
