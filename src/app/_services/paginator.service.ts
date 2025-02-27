import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  readonly currentPage = signal(1);
}
