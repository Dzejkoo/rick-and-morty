import { Component, input } from '@angular/core';
import { Character } from '../../_models/character.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
  imports: [RouterLink],
})
export class CharacterComponent {
  readonly characterData = input.required<Character>();
  readonly isLoading = input.required<boolean>();
}
