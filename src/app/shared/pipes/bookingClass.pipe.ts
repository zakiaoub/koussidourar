import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'class'
})
export class BookingClassPipe implements PipeTransform {

  private classMap: { [key: string]: string } = {
    "F": "First Class",
    "J": "Business",
    "C": "Business",
    "D": "Business",
    "I": "Business",
    "Z": "Business",
    "W": "Premium",
    "P": "Premium",
    "R": "Premium",
    "Y": "Economy",
    "B": "Economy",
    "H": "Economy",
    "K": "Economy",
    "M": "Economy",
    "L": "Economy",
    "V": "Economy",
    "S": "Economy",
    "N": "Economy",
    "Q": "Economy",
    "O": "Economy",
    "T": "Economy",
    "E": "Economy",
    "U": "Economy",
    "X": "Economy",
    "G": "Economy"
  };

  transform(code: string): string {
    return this.classMap[code] || code;
  }
}
