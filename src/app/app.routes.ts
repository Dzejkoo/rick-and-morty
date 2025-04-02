import { Routes } from '@angular/router';
import { CharacterDetailsComponent } from './_components/character-details/character-details.component';
import { CharacterListComponent } from './_components/character-list/character-list.component';
import { EpisodeComponent } from './_components/episode/episode.component';
import { LocationComponent } from './_components/location/location.component';
import { StartPageComponent } from './_components/start-page/start-page.component';
import { LocationListComponent } from './_components/location-list/location-list.component';
import { EpisodeListComponent } from './_components/episode-list/episode-list.component';

export const routes: Routes = [
  {
    path: '',
    component: StartPageComponent,
  },
  {
    path: 'locations',
    component: LocationListComponent,
  },
  {
    path: 'characters',
    component: CharacterListComponent,
  },
  {
    path: 'episodes',
    component: EpisodeListComponent,
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
    component: LocationComponent,
  },
];
