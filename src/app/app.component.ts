import { Component } from '@angular/core';
import { HeaderComponent } from './_components/header/header.component';
import { CharacterListComponent } from './_components/character-list/character-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, CharacterListComponent],
})
export class AppComponent {}
