import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteDetails'
})
export class NoteDetailsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
