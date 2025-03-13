import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../env/environment';
import { Episode, Season } from '../_models/episode.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private readonly _httpClient = inject(HttpClient);
  readonly episodesCount = signal(0);

  getEpisodes(episodeIds: string[] | undefined) {
    return this._httpClient
      .get<Episode[] | Episode>(`${environment.apiUrl}/episode/${episodeIds}`)
      .pipe(
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
}
