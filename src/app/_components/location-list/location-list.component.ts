import { Component, computed, inject } from '@angular/core';
import { LocationListService } from './location-list.service';
import { LoaderComponent } from '../loader/loader.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { RouterLink } from '@angular/router';
import { PaginatorService } from '../paginator/paginator.service';

@Component({
  selector: 'app-location-list',
  imports: [LoaderComponent, PaginatorComponent, RouterLink],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss',
})
export class LocationListComponent {
  private readonly _locationListService = inject(LocationListService);

  readonly locationResponse = this._locationListService.allLocations;

  readonly isLoading = this._locationListService.characterLoading;
  readonly locations = computed(() => this.locationResponse().results);
  readonly paginatorInfo = computed(() => this.locationResponse().info ?? {});
}
