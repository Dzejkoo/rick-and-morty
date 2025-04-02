import { Component, inject } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-start-page',
  imports: [],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
})
export class StartPageComponent {
  readonly mainImage = inject(AppService).mainImage;
}
