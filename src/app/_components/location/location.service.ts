import { computed, inject, Injectable, signal } from '@angular/core';
import { AppService } from '../../app.service';
import { delay, iif, map, of, tap } from 'rxjs';
import { Location } from '../../_models/location.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { Character } from '../../_models/character.interface';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private readonly _appService = inject(AppService);
  private readonly _characterIds = signal<string[] | undefined>(undefined);
  readonly characterCount = signal(0);

  private readonly _characterResource = rxResource({
    request: this._characterIds,
    loader: ({ request }) => {
      if (!request?.length) return of([] as Character[]);
      return this._appService.fetchCharacter<Character[]>(request).pipe(
        map((characters) =>
          Array.isArray(characters) ? characters : [characters],
        ),
        delay(500),
      );
    },
  });
  readonly characters = computed(() => this._characterResource.value());
  readonly characterLoading = this._characterResource.isLoading;

  getLocation(locationId: string, stateLocation: Location) {
    return iif(
      () => !!stateLocation,
      of(stateLocation),
      this._appService.fecthLocation<Location>(locationId),
    ).pipe(tap(({ residents }) => this._getCharacterIds(residents)));
  }

  private _getCharacterIds(residents: string[]) {
    const episodeIds = residents.map((resident) => resident.replace(/\D/g, ''));
    if (JSON.stringify(this._characterIds()) !== JSON.stringify(episodeIds)) {
      this.characterCount.set(residents.length);
      this._characterIds.set(episodeIds);
    }
  }
}
