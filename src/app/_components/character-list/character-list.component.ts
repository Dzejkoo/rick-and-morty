import { Component, inject } from '@angular/core';
import { CharacterListService } from './character-list.service';
import { CharacterComponent } from './_components/character/character.component';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
  imports: [CharacterComponent],
  providers: [CharacterListService],
})
export class CharacterListComponent {
  private readonly _characterService = inject(CharacterListService);
  readonly characters = this._characterService.allCharacters;
  readonly isLoading = this._characterService.characterLoading;
}
