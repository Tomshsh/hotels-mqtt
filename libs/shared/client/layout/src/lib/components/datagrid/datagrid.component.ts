import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ɵbo as Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';


@Component({
  selector: 'ui-data-grid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatagridComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('table', { static: false })
  gridView: Ng2SmartTableComponent;

  @Input()
  source: any[] | LocalDataSource;

  @Input()
  columns: any;

  @Input()
  loading: boolean;

  @Output()
  createConfirm: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  editConfirm: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updateConfirm: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  deleteConfirm: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  duplicateAction: EventEmitter<any> = new EventEmitter<any>();

  constructor(private readonly cd: ChangeDetectorRef) {

  }

  settings = {
    noDataMessage: 'No data loaded.',
    columns: [],
    hideSubHeader: false,
    add: {
      confirmCreate: true
    },
    edit: {
      confirmSave: true
    },
    delete: {
      confirmDelete: true
    },

    actions: {
      add: true,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          title: '<i class="fa fa-edit" title="Update"></i>'
        },
        {
          name: 'delete',
          title: '<i class="fa fa-trash" title="Delete"></i>'
        },
        {
          name: 'duplicate',
          title: '<i class="fa fa-copy" title="Duplicate"></i>',
        }
      ]
    }
  };

  ngOnInit(): void {
    this.settings.columns = this.columns;
  }

  ngAfterViewInit() {
    this.gridView.custom.subscribe(({ action, data, source }) => {
      switch (action) {
        case 'edit':
          break;
        case 'duplicate':
          this.gridView.grid.createFormShown = true;
          this.gridView.grid.dataSet.newRow.setData(data);
          this.duplicateAction.emit(data);
          break;
        case 'delete':
          break;
      }
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.cd.detectChanges();
    }, 0);
  }

  onCustom($event) {
    console.log(`Custom event '${ $event.action }' fired on row №: ${ JSON.stringify($event.data) }`)
  }

  onCreate($event) {
    this.createConfirm.emit($event);
  }
}
