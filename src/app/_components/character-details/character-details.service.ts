import { Character } from './../../_models/character.interface';
import {
  computed,
  inject,
  Injectable,
  linkedSignal,
  ResourceStatus,
  signal,
  WritableSignal,
} from '@angular/core';
import { delay, iif, map, of, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/environment';
import { rxResource } from '@angular/core/rxjs-interop';
import { EpisodeService } from '../../_services/episode.service';
import { Season } from '../../_models/episode.interface';

@Injectable({ providedIn: 'root' })
export class CharacterDetailsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _episodesService = inject(EpisodeService);
  private readonly _episodesIds = signal<string[] | undefined>(undefined);

  private readonly _episodesResource = rxResource({
    request: this._episodesIds,
    loader: ({ request }) =>
      this._episodesService.getEpisodes(request).pipe(delay(500)),
  });

  readonly episodes: WritableSignal<Season[]> = linkedSignal({
    source: () => ({
      value: this._episodesResource.value(),
      status: this._episodesResource.status(),
    }),
    computation: (source, previous) => {
      if (previous && source.status === ResourceStatus.Loading) {
        return previous.value;
      }
      return source.value ?? ([] as Season[]);
    },
  });

  readonly episodeLoading = this._episodesResource.isLoading;

  getCharacterData(characterId: string, stateCharacter: Character) {
    return iif(
      () => !!stateCharacter,
      of(stateCharacter),
      this._getCharacter(characterId),
    ).pipe(
      tap((character) => this._getEpisodeIds(character)),
      map((character) => ({
        ...character,
        location: {
          ...character.location,
          url: character.location.url.replace(/\D/g, ''),
        },
      })),
    );
  }

  private _getEpisodeIds(character: Character) {
    const episodeIds = character.episode.map((episode) =>
      episode.replace(/\D/g, ''),
    );
    if (JSON.stringify(this._episodesIds()) !== JSON.stringify(episodeIds)) {
      this._episodesIds.set(episodeIds);
    }
  }

  private _getCharacter(characterId: string) {
    return this._httpClient.get<Character>(
      `${environment.apiUrl}/character/${characterId}`,
    );
  }
}
