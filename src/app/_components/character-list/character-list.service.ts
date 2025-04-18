import {
  inject,
  Injectable,
  linkedSignal,
  ResourceStatus,
  WritableSignal,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { CharacterGetResponse } from '../../_models/character.interface';
import { catchError, delay, of } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { PaginatorService } from '../paginator/paginator.service';

@Injectable({ providedIn: 'root' })
export class CharacterListService {
  private readonly _appService = inject(AppService);
  private readonly _router = inject(Router);
  private readonly _paginatorService = inject(PaginatorService);

  readonly pageFromUrl = toSignal(
    this._paginatorService.getCurrentPageFromUrl('characters'),
  );

  private readonly _allCharactersResource = rxResource({
    request: () => this.pageFromUrl(),
    loader: ({ request }) =>
      this._appService.fetchAllCharacters(request).pipe(
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
}
