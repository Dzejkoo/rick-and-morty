import { Component, input } from '@angular/core';
import { Info } from '../../../../_models/character.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  readonly paginaotrData = input.required<Info>();
}
