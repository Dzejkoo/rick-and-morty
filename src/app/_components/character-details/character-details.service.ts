import { Character } from './../../_models/character.interface';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay, iif, of, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/environment';
import { rxResource } from '@angular/core/rxjs-interop';
import { EpisodeService } from '../../_services/episode.service';
import { Episode } from '../../_models/episode.interface';

@Injectable()
export class CharacterDetailsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _episodesService = inject(EpisodeService);
  private readonly _characterId = inject(ActivatedRoute).snapshot.paramMap.get(
    'id',
  ) as string;
  private readonly _state = inject(Router).getCurrentNavigation()?.extras
    ?.state as Character;

  private readonly _episodesIds = signal<string[] | undefined>(undefined);

  private readonly _episodesResource = rxResource({
    request: this._episodesIds,
    loader: ({ request }) =>
      this._episodesService.getEpisodes(request).pipe(delay(500)),
  });

  readonly episodes = computed(() => {
    const episodesArr = this._episodesResource.value() ?? [];
    const grouped: Record<string, Episode[]> = {};

    episodesArr.forEach((episode) => {
      const match = episode.episode.match(/S(\d{2})E\d{2}/);
      if (match) {
        const seasonKey = `Season ${parseInt(match[1])}`;
        if (!grouped[seasonKey]) {
          grouped[seasonKey] = [];
        }
        grouped[seasonKey].push(episode);
      }
    });

    return Object.entries(grouped).map(([title, episodes]) => ({
      title,
      episodes,
    }));
  });
  readonly numberOfEpisodes = computed(
    () => this._episodesResource.value()?.length ?? 0,
  );
  readonly episodeLoading = this._episodesResource.isLoading;

  getCharacterData() {
    return iif(
      () => !!this._state,
      of(this._state),
      this._getCharacter(this._characterId).pipe(),
    ).pipe(
      tap((character) => {
        const episodeIds = character.episode.map((episode) =>
          episode.replace(/\D/g, ''),
        );
        this._episodesIds.set(episodeIds);
      }),
    );
  }

  private _getCharacter(characterId: string) {
    return this._httpClient.get<Character>(
      `${environment.apiUrl}/character/${characterId}`,
    );
  }
}
