import { PaginatorService } from '../../_services/paginator.service';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CharacterGetResponse } from '../../_models/character.interface';
import { environment } from '../../../env/environment';
import { delay } from 'rxjs';

@Injectable()
export class CharacterListService {
  readonly #httpClient = inject(HttpClient);
  readonly #pagiantorService = inject(PaginatorService);

  private readonly _allCharactersResource = rxResource({
    request: this.#pagiantorService.currentPage,
    loader: ({ request }) => this._getAllCharacters(request).pipe(delay(500)),
  });

  readonly characterLoading = this._allCharactersResource.isLoading;

  readonly allCharacters = computed(
    () => this._allCharactersResource.value() ?? ({} as CharacterGetResponse),
  );

  private _getAllCharacters(page: number) {
    return this.#httpClient.get<CharacterGetResponse>(
      `${environment.apiUrl}/character?page=${page}`,
    );
  }
}
