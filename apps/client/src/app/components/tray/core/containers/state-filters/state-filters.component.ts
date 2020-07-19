import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DefaultFilter, LocalDataSource } from 'ng2-smart-table';
import { TrayDataService } from '@my-tray/data-services/mytray/services';
import { takeUntil } from 'rxjs/operators';
import { TrayDto } from '@my-tray/api-interfaces';
import { Subject } from 'rxjs';

@Component({
  selector: 'my-tray-state-filters',
  templateUrl: './state-filters.component.html',
  styleUrls: ['./state-filters.component.scss']
})
export class StateFiltersComponent extends DefaultFilter implements OnInit, OnChanges, OnDestroy {
  readonly destroy$: Subject<any> = new Subject<any>();
  source: LocalDataSource;

  constructor(private readonly service: TrayDataService) {
    super();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  async onFilterUpdate(selectedFilters: any[]) {
    this.service.getAllTrays()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (states: TrayDto[]) => {
        const predicate = selectedFilters.map(filter => filter.value);
        let filteredStates = states.filter(filter => !filter.isService);
        if (predicate.length > 0) {
          filteredStates = states.filter(el => {
            const statesWithMatchingFilter = el.states?.filter(state => {
              return predicate.includes(state.lastAction);
            });
            return statesWithMatchingFilter && statesWithMatchingFilter.length > 0;
          });
        }
        await this.source.load(filteredStates);
        const rows = Array.from(document.querySelectorAll('ng2-smart-table table > tbody > tr'));
        rows.forEach(row => {
          row.dispatchEvent(new Event('click', {}));
        })
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
