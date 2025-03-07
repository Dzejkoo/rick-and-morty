import { Component } from '@angular/core';
import { HeaderComponent } from './_components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, RouterOutlet],
})
export class AppComponent {}
