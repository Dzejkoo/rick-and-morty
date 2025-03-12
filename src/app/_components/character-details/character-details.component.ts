import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, Location, NgClass } from '@angular/common';
import { Character } from '../../_models/character.interface';
import { TemplateFuncPipe } from '../../_pipes/template-func.pipe';
import { CharacterDetailsService } from './character-details.service';

const UNKNOWN_STATUS = 'unknown';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
  imports: [AsyncPipe, TemplateFuncPipe, NgClass, RouterLink],
  providers: [CharacterDetailsService],
})
export class CharacterDetailsComponent {
  private readonly _router = inject(Router);
  private readonly _location = inject(Location);
  private readonly _characterDetailsService = inject(CharacterDetailsService);
  readonly characterData$ = this._characterDetailsService.getCharacterData();
  readonly episodesData = this._characterDetailsService.episodes;
  readonly episodesLoading = this._characterDetailsService.episodeLoading;
  readonly episodesCount = this._characterDetailsService.numberOfEpisodes;
  readonly unknown = UNKNOWN_STATUS;

  back() {
    if (window.history.state?.navigationId > 2) {
      this._location.back();
    } else {
      this._router.navigate(['/']);
    }
  }

  getSpecies = (character: Character) =>
    character.species !== UNKNOWN_STATUS
      ? `${character.species}${character.type && character.type !== UNKNOWN_STATUS ? ' - ' + character.type : ''}`
      : '';
}
