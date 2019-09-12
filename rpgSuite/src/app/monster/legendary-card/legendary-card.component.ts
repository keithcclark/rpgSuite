import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-legendary-card',
  templateUrl: './legendary-card.component.html',
  styleUrls: ['./legendary-card.component.sass']
})
export class LegendaryCardComponent implements OnInit {

  @Input() legendaryNo: Number;
  @Output() removeLegendary = new EventEmitter<Number>();

  constructor() { }

  ngOnInit() {
  }

  removeMe() {
    // console.log('removeMe called');
    this.removeLegendary.emit(this.legendaryNo);
  }
}
