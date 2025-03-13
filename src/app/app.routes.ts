import { Routes } from '@angular/router';
import { CharacterDetailsComponent } from './_components/character-details/character-details.component';
import { CharacterListComponent } from './_components/character-list/character-list.component';
import { EpisodeComponent } from './_components/episode/episode.component';
import { LocationsComponent } from './_components/locations/locations.component';

export const routes: Routes = [
  {
    path: '',
    component: CharacterListComponent,
  },
  {
    path: 'character/:characterId',
    component: CharacterDetailsComponent,
  },
  {
    path: 'episode/:episodeId',
    component: EpisodeComponent,
  },
  {
    path: 'location/:locationId',
    component: LocationsComponent,
  },
];
