import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe, Location, NgClass } from '@angular/common';
import { Character } from '../../_models/character.interface';
import { TemplateFuncPipe } from '../../_pipes/template-func.pipe';
import { CharacterDetailsService } from './character-details.service';
import { LoaderComponent } from '../loader/loader.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { filter, map, switchMap } from 'rxjs';
import { EpisodeService } from '../../_services/episode.service';

const UNKNOWN_STATUS = 'unknown';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
  imports: [
    AsyncPipe,
    TemplateFuncPipe,
    NgClass,
    RouterLink,
    LoaderComponent,
    NavigationComponent,
  ],
})
export class CharacterDetailsComponent {
  private readonly _characterDetailsService = inject(CharacterDetailsService);
  private readonly _episodesService = inject(EpisodeService);
  private readonly _activateRoute = inject(ActivatedRoute);
  private readonly _state = inject(Router).getCurrentNavigation()?.extras
    ?.state as Character;
  readonly characterData$ = this._getParamsAndFetchData();
  readonly episodesData = this._characterDetailsService.episodes;
  readonly episodesLoading = this._characterDetailsService.episodeLoading;
  readonly episodesCount = this._episodesService.episodesCount;
  readonly unknown = UNKNOWN_STATUS;

  private _getParamsAndFetchData() {
    return this._activateRoute.params.pipe(
      filter(({ characterId }) => !!characterId),
      map(({ characterId }) => characterId),
      switchMap((characterId) =>
        this._characterDetailsService.getCharacterData(
          characterId,
          this._state,
        ),
      ),
    );
  }

  getSpecies = (character: Character) =>
    `${character.species}${character.type && character.type !== UNKNOWN_STATUS ? ' - ' + character.type : ''}`;
}
