import { PaginatorService } from '../../_services/paginator.service';
import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  linkedSignal,
  ResourceStatus,
  WritableSignal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CharacterGetResponse } from '../../_models/character.interface';
import { environment } from '../../../env/environment';
import { catchError, delay, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CharacterListService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _router = inject(Router);
  private readonly _pagiantorService = inject(PaginatorService);

  private readonly _allCharactersResource = rxResource({
    request: () => this._pagiantorService.pageFromUrl(),
    loader: ({ request }) =>
      this._getAllCharacters(request).pipe(
        catchError(() => {
          this._router.navigate(['/']);
          return of(null);
        }),
        delay(500),
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

  private _getAllCharacters(page: number) {
    return this._httpClient.get<CharacterGetResponse>(
      `${environment.apiUrl}/character?page=${page}`,
    );
  }
}
