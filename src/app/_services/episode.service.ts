import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { Episode } from '../_models/episode.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private readonly _httpClient = inject(HttpClient);

  getEpisodes(episodeIds: string[] | undefined) {
    return this._httpClient
      .get<Episode[] | Episode>(`${environment.apiUrl}/episode/${episodeIds}`)
      .pipe(map((episode) => (Array.isArray(episode) ? episode : [episode])));
  }
}
