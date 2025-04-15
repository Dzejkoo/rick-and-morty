import { Routes } from '@angular/router';
import { StartPageComponent } from './_components/start-page/start-page.component';

export const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
  },
  {
    path: 'locations',
    loadComponent: () =>
      import('./_components/location-list/location-list.component').then(
        (m) => m.LocationListComponent,
      ),
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./_components/character-list/character-list.component').then(
        (m) => m.CharacterListComponent,
      ),
  },
  {
    path: 'episodes',
    loadComponent: () =>
      import('./_components/episode-list/episode-list.component').then(
        (m) => m.EpisodeListComponent,
      ),
  },
  {
    path: 'character/:characterId',
    loadComponent: () =>
      import(
        './_components/character-details/character-details.component'
      ).then((m) => m.CharacterDetailsComponent),
  },
  {
    path: 'episode/:episodeId',
    loadComponent: () =>
      import('./_components/episode/episode.component').then(
        (m) => m.EpisodeComponent,
      ),
  },
  {
    path: 'location/:locationId',
    loadComponent: () =>
      import('./_components/location/location.component').then(
        (m) => m.LocationComponent,
      ),
  },
];
