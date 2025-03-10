import { Component, computed, inject } from '@angular/core';
import { CharacterListService } from './character-list.service';
import { CharacterComponent } from './_components/character/character.component';
import { PaginatorComponent } from './_components/paginator/paginator.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
  imports: [CharacterComponent, PaginatorComponent],
})
export class CharacterListComponent {
  private readonly _characterService = inject(CharacterListService);
  private readonly _router = inject(Router);

  readonly characterResponse = this._characterService.allCharacters;

  readonly isLoading = this._characterService.characterLoading;
  readonly characters = computed(() => this.characterResponse().results);
  readonly paginatorInfo = computed(() => this.characterResponse().info ?? {});
}
