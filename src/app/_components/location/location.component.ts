import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LocationService } from './location.service';
import { CharacterComponent } from '../character/character.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-location',
  imports: [AsyncPipe, CharacterComponent, LoaderComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  private readonly _activateRoute = inject(ActivatedRoute);
  private readonly _locationService = inject(LocationService);
  readonly characters = this._locationService.characters;
  readonly charactersLoading = this._locationService.characterLoading;

  readonly locationData$ = this._getParamsAndFetchData();

  private _getParamsAndFetchData() {
    return this._activateRoute.params.pipe(
      filter(({ locationId }) => !!locationId),
      map(({ locationId }) => locationId),
      switchMap((locationId) => this._locationService.getLocation(locationId)),
    );
  }
}
