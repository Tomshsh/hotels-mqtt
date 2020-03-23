import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';


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

  constructor(private readonly cd: ChangeDetectorRef) {
  }

  settings = {
    noDataMessage: 'No data loaded.',
    columns: [],
    hideSubHeader: false,
    /*add: {
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
    },*/
    actions: {
      add: false, edit: false, update: false, delete: false,
      custom: [
        {
          name: 'addAction',
          title: '<i class="fa fa-plus" title="Add"></i>'
        },
        {
          name: 'updateAction',
          title: '<i class="fa fa-edit" title="Update"></i>'
        },
        {
          name: 'editAction',
          title: '<i class="fa fa-edit" title="Edit"></i>'
        },
        {
          name: 'duplicateAction',
          title: '<i class="fa fa-copy" title="Duplicate"></i>'
        }
      ]
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
