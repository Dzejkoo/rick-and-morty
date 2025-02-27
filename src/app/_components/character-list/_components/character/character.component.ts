import { Component, input } from '@angular/core';
import { Character } from '../../../../_models/character.interface';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent {
  readonly characterData = input.required<Character>();
}
