import { Component } from '@angular/core';
import { HeaderComponent } from './_components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './_components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
})
export class AppComponent {}
