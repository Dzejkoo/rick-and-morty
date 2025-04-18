import { Component, computed, inject } from '@angular/core';
import { CharacterListService } from './character-list.service';
import { CharacterComponent } from '../character/character.component';
import { LoaderComponent } from '../loader/loader.component';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
  imports: [CharacterComponent, LoaderComponent, PaginatorComponent],
})
export class CharacterListComponent {
  private readonly _characterService = inject(CharacterListService);

  readonly characterResponse = this._characterService.allCharacters;

  readonly isLoading = this._characterService.characterLoading;
  readonly characters = computed(() => this.characterResponse().results);
  readonly paginatorInfo = computed(() => this.characterResponse().info ?? {});
}
