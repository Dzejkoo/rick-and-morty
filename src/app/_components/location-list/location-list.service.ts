import {
  inject,
  Injectable,
  linkedSignal,
  ResourceStatus,
  WritableSignal,
} from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { PaginatorService } from '../paginator/paginator.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { LocationGetResponse } from '../../_models/location.interface';
import { catchError, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationListService {
  private readonly _appService = inject(AppService);
  private readonly _router = inject(Router);
  private readonly _paginatorService = inject(PaginatorService);
  readonly pageFromUrl = toSignal(
    this._paginatorService.getCurrentPageFromUrl('locations'),
  );

  private readonly _allLocationResources = rxResource({
    request: () => this.pageFromUrl(),
    loader: ({ request }) =>
      this._appService.fetchAllLocations(request).pipe(
        delay(500),
        catchError(() => {
          this._router.navigate(['/']);
          return of(null);
        }),
      ),
  });

  readonly characterLoading = this._allLocationResources.isLoading;

  readonly allLocations: WritableSignal<LocationGetResponse> = linkedSignal({
    source: () => ({
      value: this._allLocationResources.value(),
      status: this._allLocationResources.status(),
    }),
    computation: (source, previous) => {
      if (previous && source.status === ResourceStatus.Loading) {
        return previous.value;
      }
      return source.value ?? ({} as LocationGetResponse);
    },
  });
}
