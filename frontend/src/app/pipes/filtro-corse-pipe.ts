import { Pipe, PipeTransform } from '@angular/core';
import { CorsaResponse } from '../models/CorsaResponse';

@Pipe({
  name: 'filtroCorse'
})
export class FiltroCorsePipe implements PipeTransform {

  transform(elencoCorse: CorsaResponse[], destinazione: string): CorsaResponse[] {
    
    return elencoCorse.filter(corsa => corsa.arrivoLuogo.toLocaleLowerCase().includes(destinazione.toLocaleLowerCase()));

  }

}
