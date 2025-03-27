import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
} from 'rxjs';

const ALLOW_PAGE = ['characters', 'locations', 'episodes'];

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  private readonly _router = inject(Router);
  private readonly _location = inject(Location);
  readonly currentPage$ = this._getCurrentPageFromUrl();
  readonly pageFromUrl = toSignal(this.currentPage$);

  private _getCurrentPageFromUrl() {
    return this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        const fullPath = this._location.path();
        const queryParams = fullPath.split('?')[1];
        const params = new URLSearchParams(queryParams);
        if (!ALLOW_PAGE.some((page) => fullPath.includes(page))) {
          return 0;
        }

        if (!params.size) {
          return 1;
        }
        return Number(params.get('page'));
      }),
      filter((page) => !!page),
      distinctUntilChanged(),
      shareReplay(1),
    );
  }
}
