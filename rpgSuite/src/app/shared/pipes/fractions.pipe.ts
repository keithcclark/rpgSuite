import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fractions'
})
export class FractionsPipe implements PipeTransform {
  fraction: String;
  transform(value: any, args?: any): any {
    this.fraction = this.convertToFraction(value);
    return this.fraction;
  }

  convertToFraction(num: any) {
    if (num === '0.125') {
      return '1/8';
    } else if (num === '0.25') {
      return '1/4';
    } else if (num === '0.5') {
      return '1/2';
    } else {
    return num;
    }
  }
}
