import { Component, inject, input, computed } from '@angular/core';

import { RouterLink } from '@angular/router';
import { PaginatorService } from './paginator.service';
import { TemplateFuncPipe } from '../../_pipes/template-func.pipe';
import { Info } from '../../_models/info.interface';
import { toSignal } from '@angular/core/rxjs-interop';

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

  readonly pageFromUrl = toSignal(
    this._paginatorService.getCurrentPageFromUrl(),
  );

  readonly currentPage = computed(() => this.pageFromUrl() ?? 1);

  readonly totalPages = computed(() => this.paginaotrData()?.pages || 1);

  readonly paginatorPages = computed(() => this._range());

  getParamsObject = (page: number) => ({ page: page == 1 ? null : page });

  private _range() {
    const lastPage = this.totalPages();
    const params = this.currentPage();

    if (lastPage <= 3) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    if (params <= 2) {
      return [1, 2, 3];
    }

    if (params >= lastPage - 1) {
      return [lastPage - 2, lastPage - 1, lastPage];
    }

    return [params - 1, params, params + 1];
  }
}
