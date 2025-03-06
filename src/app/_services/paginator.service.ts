import { Location } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  private readonly _router = inject(Router);
  private readonly _location = inject(Location);
  readonly pageFromUrl = toSignal(this._getCurrentPageFromUrl());

  private _getCurrentPageFromUrl() {
    return this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        const queryParams = this._location.path().split('?')[1];
        const params = new URLSearchParams(queryParams);
        if (params.get('page')) {
          return Number(params.get('page')) || 1;
        }
        return 1;
      }),
    );
  }
}
