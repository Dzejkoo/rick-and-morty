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
import { catchError, delay, of } from 'rxjs';
import { EpisodeGetResponse } from '../../_models/episode.interface';

@Injectable({ providedIn: 'root' })
export class EpisodeLisService {
  private readonly _appService = inject(AppService);
  private readonly _router = inject(Router);
  private readonly _paginatorService = inject(PaginatorService);
  readonly pageFromUrl = toSignal(
    this._paginatorService.getCurrentPageFromUrl('episodes'),
  );

  private readonly _allEpisodeResource = rxResource({
    request: () => this.pageFromUrl(),
    loader: ({ request }) =>
      this._appService.fetchAllEpisodes(request).pipe(
        delay(500),
        catchError(() => {
          this._router.navigate(['/']);
          return of(null);
        }),
      ),
  });
  readonly episodeLoading = this._allEpisodeResource.isLoading;

  readonly allEpisodes: WritableSignal<EpisodeGetResponse> = linkedSignal({
    source: () => ({
      value: this._allEpisodeResource.value(),
      status: this._allEpisodeResource.status(),
    }),
    computation: (source, previous) => {
      console.log(source.value);
      if (previous && source.status === ResourceStatus.Loading) {
        return previous.value;
      }
      return source.value ?? ({} as EpisodeGetResponse);
    },
  });
}
