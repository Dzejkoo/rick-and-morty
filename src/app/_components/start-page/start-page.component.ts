import { Component, inject } from '@angular/core';
import { AppService } from '../../app.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-start-page',
  imports: [NgOptimizedImage],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
})
export class StartPageComponent {
  readonly mainImage = inject(AppService).mainImage;
}
