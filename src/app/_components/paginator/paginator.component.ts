import { Component, inject, input, computed } from '@angular/core';

import { RouterLink } from '@angular/router';
import { PaginatorService } from './paginator.service';
import { Info } from '../../_models/character.interface';
import { TemplateFuncPipe } from '../../_pipes/template-func.pipe';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  imports: [RouterLink, TemplateFuncPipe],
})
export class PaginatorComponent {
  private readonly _paginatorService = inject(PaginatorService);
  readonly paginaotrData = input.required<Info>();
  readonly isLoading = input.required<boolean>();

  readonly currentPage = computed(
    () => this._paginatorService.pageFromUrl() ?? 1,
  );

  readonly totalPages = computed(() => this.paginaotrData()?.pages || 1);

  readonly paginatorPages = computed(() => this._range());

  getParamsObject = (page: number) => ({ page: page == 1 ? null : page });

  private _range() {
    const lastPage = this.totalPages();
    const currentPage = this.currentPage();

    if (lastPage <= 3) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3];
    }

    if (currentPage >= lastPage - 1) {
      return [lastPage - 2, lastPage - 1, lastPage];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  }
}
