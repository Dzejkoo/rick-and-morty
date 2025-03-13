import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  private readonly _router = inject(Router);
  private readonly _location = inject(Location);
  back() {
    if (window.history.state?.navigationId > 2) {
      this._location.back();
    } else {
      this._router.navigate(['/']);
    }
  }
}
