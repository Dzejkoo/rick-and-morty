import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { EpisodeLisService } from './episode-list.service';

@Component({
  selector: 'app-episode-list',
  imports: [RouterLink, LoaderComponent, PaginatorComponent],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.scss',
})
export class EpisodeListComponent {
  private readonly _episodeListService = inject(EpisodeLisService);

  readonly episodeResponse = this._episodeListService.allEpisodes;

  readonly isLoading = this._episodeListService.episodeLoading;
  readonly episodes = computed(() => this.episodeResponse().results);
  readonly paginatorInfo = computed(() => this.episodeResponse().info ?? {});
}
