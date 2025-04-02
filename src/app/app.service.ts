import { inject, Injectable } from '@angular/core';
import { environment } from '../env/environment';
import { HttpClient } from '@angular/common/http';
import { CharacterGetResponse } from './_models/character.interface';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LocationGetResponse } from './_models/location.interface';
import { EpisodeGetResponse } from './_models/episode.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _location = inject(Location);
  private readonly _router = inject(Router);

  fecthLocation<T>(locationId: string[] | string) {
    return this._httpClient.get<T>(
      `${environment.apiUrl}/location/${locationId}`,
    );
  }

  fetchCharacter<T>(characterId: string[] | string) {
    return this._httpClient.get<T>(
      `${environment.apiUrl}/character/${characterId}`,
    );
  }

  fetchAllEpisodes(page: number) {
    console.log(page);
    return this._httpClient.get<EpisodeGetResponse>(
      `${environment.apiUrl}/episode?page=${page}`,
    );
  }

  fetchAllLocations(page: number) {
    return this._httpClient.get<LocationGetResponse>(
      `${environment.apiUrl}/location?page=${page}`,
    );
  }

  fetchAllCharacters(page: number) {
    return this._httpClient
      .get<CharacterGetResponse>(`${environment.apiUrl}/character?page=${page}`)
      .pipe(
        mergeMap((characters: CharacterGetResponse) =>
          this._handleImageProces(characters),
        ),
      );
  }

  fetchEpisodes<T>(episodeIds: string[] | undefined) {
    return this._httpClient.get<T>(
      `${environment.apiUrl}/episode/${episodeIds}`,
    );
  }

  back() {
    if (window.history.state?.navigationId > 2) {
      this._location.back();
    } else {
      this._router.navigate(['/']);
    }
  }

  private _handleImageProces(characters: CharacterGetResponse) {
    const imageLoadObservables = characters.results.map((character) => {
      return this._preloadImages(character.image);
    });

    return forkJoin(imageLoadObservables).pipe(
      map((blobs) => {
        characters.results.forEach((character, index) => {
          character.image = blobs[index] as string;
        });
        return characters;
      }),
    );
  }

  private _preloadImages(url: string) {
    return new Observable((observer) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to load image');
          }
          return response.blob();
        })
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            observer.next(reader.result);
            observer.complete();
          };
          reader.readAsDataURL(blob);
        })
        .catch(() => {
          observer.next(null);
          observer.complete();
        });
    });
  }
}
