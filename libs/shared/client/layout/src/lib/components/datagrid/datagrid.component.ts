import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbIconLibraries } from '@nebular/theme';


@Component({
  selector: 'ui-data-grid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatagridComponent implements OnInit, OnChanges {

  @Input()
  source: any[] | LocalDataSource;

  @Input()
  columns: any;

  @Input()
  loading: boolean;

  constructor(private readonly cd: ChangeDetectorRef, private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('regular', { packClass: 'far', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('solid', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  settings = {
    noDataMessage: 'No data loaded.',
    columns: [],
    hideSubHeader: false,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: true, update: true, delete: true
    }
  };

  ngOnInit(): void {
    this.settings.columns = this.columns;
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.cd.detectChanges();
    }, 0);
  }
}
