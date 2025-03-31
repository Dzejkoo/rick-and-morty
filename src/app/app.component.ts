import { Component, inject } from '@angular/core';
import { HeaderComponent } from './_components/header/header.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './_components/footer/footer.component';
import { NavigationComponent } from './_components/navigation/navigation.component';
import { filter, map } from 'rxjs';

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
export class AppComponent {
  private readonly _router = inject(Router);
  readonly hideElement$ = this._hideElement();

  private _hideElement() {
    return this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => !(event.url === '/')),
    );
  }
}
