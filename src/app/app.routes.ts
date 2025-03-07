import { Routes } from '@angular/router';
import { CharacterDetailsComponent } from './_components/character-details/character-details.component';
import { CharacterListComponent } from './_components/character-list/character-list.component';

export const routes: Routes = [
  {
    path: '',
    component: CharacterListComponent,
  },
  {
    path: 'character/:id',
    component: CharacterDetailsComponent,
  },
];
