import { Component } from '@angular/core';
import { HeaderComponent } from './_components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './_components/footer/footer.component';
import { CharacterComponent } from './_components/character/character.component';
import { NavigationComponent } from './_components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    NavigationComponent,
  ],
})
export class AppComponent {}
