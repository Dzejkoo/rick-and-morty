import {
  inject,
  Injectable,
  linkedSignal,
  ResourceStatus,
  signal,
  WritableSignal,
} from '@angular/core';
import { Episode, Season } from '../../_models/episode.interface';
import { delay, iif, map, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Character } from '../../_models/character.interface';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private readonly _appService = inject(AppService);
  private readonly _characterIds = signal<string[] | undefined>(undefined);
  readonly episodesCount = signal(0);
  readonly characterCount = signal(0);

  private readonly _characterResource = rxResource({
    request: this._characterIds,
    loader: ({ request }) =>
      this._appService.fetchCharacter(request).pipe(delay(500)),
  });

  readonly characterLoading = this._characterResource.isLoading;

  readonly characters: WritableSignal<Character[]> = linkedSignal({
    source: () => ({
      value: this._characterResource.value(),
      status: this._characterResource.status(),
    }),
    computation: (source, previous) => {
      if (previous && source.status === ResourceStatus.Loading) {
        return previous.value;
      }
      return source.value ?? ([] as Character[]);
    },
  });

  groupEpisodesBySeason(episodeIds: string[] | undefined) {
    return this._appService.fetchEpisodes<Episode[]>(episodeIds).pipe(
      map((episode) => (Array.isArray(episode) ? episode : [episode])),
      map((episodes) => {
        this.episodesCount.set(episodes.length);
        const grouped: Record<string, Episode[]> = {};
        episodes.forEach((episode) => {
          const match = episode.episode.match(/S(\d{2})E\d{2}/);
          if (match) {
            const seasonKey = `Season ${parseInt(match[1])}`;
            if (!grouped[seasonKey]) {
              grouped[seasonKey] = [];
            }
            grouped[seasonKey].push(episode);
          }
        });

        return Object.entries(grouped).map(
          ([title, episodes]) =>
            ({
              title,
              episodes,
            }) as Season,
        );
      }),
    );
  }

  getEpisode(episodeIds: string[], stateEpisode: Episode) {
    return iif(
      () => !!stateEpisode,
      of(stateEpisode),
      this._appService.fetchEpisodes<Episode>(episodeIds),
    ).pipe(tap(({ characters }) => this._getCharacterIds(characters)));
  }

  private _getCharacterIds(characters: string[]) {
    const episodeIds = characters.map((character) =>
      character.replace(/\D/g, ''),
    );
    if (JSON.stringify(this._characterIds()) !== JSON.stringify(episodeIds)) {
      this.characterCount.set(episodeIds.length);
      this._characterIds.set(episodeIds);
    }
  }
}
