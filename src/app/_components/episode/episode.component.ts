import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from '../../_models/episode.interface';
import { filter, map, switchMap } from 'rxjs';
import { EpisodeService } from './episode.service';
import { AsyncPipe } from '@angular/common';
import { CharacterComponent } from '../character/character.component';
import { LoaderComponent } from '../loader/loader.component';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-episode',
  imports: [AsyncPipe, CharacterComponent, LoaderComponent],
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.scss',
})
export class EpisodeComponent {
  private readonly _episodeService = inject(EpisodeService);
  private readonly _activateRoute = inject(ActivatedRoute);
  private readonly _state = inject(Router).getCurrentNavigation()?.extras
    ?.state as Episode;
  private readonly _appService = inject(AppService);
  readonly episodeData$ = this._getParamsAndFetchData();
  readonly characters = this._episodeService.characters;
  readonly charactersLoading = this._episodeService.characterLoading;
  readonly characterCount = this._episodeService.characterCount;

  back() {
    this._appService.back();
  }

  private _getParamsAndFetchData() {
    return this._activateRoute.params.pipe(
      filter(({ episodeId }) => !!episodeId),
      map(({ episodeId }) => episodeId),
      switchMap((episodeId) =>
        this._episodeService.getEpisode(episodeId, this._state),
      ),
    );
  }
}
