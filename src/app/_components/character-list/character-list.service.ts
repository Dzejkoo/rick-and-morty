import { PaginatorService } from '../../_services/paginator.service';
import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  linkedSignal,
  ResourceStatus,
  WritableSignal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CharacterGetResponse } from '../../_models/character.interface';
import { environment } from '../../../env/environment';
import {
  catchError,
  delay,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CharacterListService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _router = inject(Router);
  private readonly _pagiantorService = inject(PaginatorService);

  private readonly _allCharactersResource = rxResource({
    request: () => this._pagiantorService.pageFromUrl(),
    loader: ({ request }) =>
      this._getAllCharacters(request).pipe(
        mergeMap((characters: CharacterGetResponse) =>
          this._handleImageProces(characters),
        ),
        delay(500),
        catchError(() => {
          this._router.navigate(['/']);
          return of(null);
        }),
      ),
  });

  readonly characterLoading = this._allCharactersResource.isLoading;

  readonly allCharacters: WritableSignal<CharacterGetResponse> = linkedSignal({
    source: () => ({
      value: this._allCharactersResource.value(),
      status: this._allCharactersResource.status(),
    }),
    computation: (source, previous) => {
      if (previous && source.status === ResourceStatus.Loading) {
        return previous.value;
      }
      return source.value ?? ({} as CharacterGetResponse);
    },
  });

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

  private _getAllCharacters(page: number) {
    return this._httpClient.get<CharacterGetResponse>(
      `${environment.apiUrl}/character?page=${page}`,
    );
  }
}
