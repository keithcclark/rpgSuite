import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  constructor(private element: ElementRef) { }
  @Output() clickOutside: EventEmitter<any> = new EventEmitter();
  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
    const clickedInside = this.element.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(null);
    }
  }
}
