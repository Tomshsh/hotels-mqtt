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
import { LocalDataSource, ɵbo as Ng2SmartTableComponent } from 'ng2-smart-table';

@Component({
  selector: 'ui-data-grid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
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

  @Input()
  actions: any;

  @Output()
  createConfirm: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  duplicateConfirm: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updateConfirm: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  deleteConfirm: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  userRowSelect: EventEmitter<any> = new EventEmitter<any>()


  constructor(private readonly cd: ChangeDetectorRef) {
  }

  settings: any;

  ngOnInit(): void {
    this.settings = {
      noDataMessage: 'No data loaded.',
      columns: [],
      hideSubHeader: false,
      add: {
        addButtonContent: '<i class="fa fa-plus" title="Create"></i>',
        createButtonContent: '<i class="fa fa-check" ></i>',
        cancelButtonContent: '<i class="fa fa-close"></i>',
        confirmCreate: true
      },
      edit: {
        editButtonContent: '<i class="fa fa-edit" title="Update"></i>',
        saveButtonContent: '<i class="fa fa-check"></i>',
        cancelButtonContent: '<i class="fa fa-close"></i>',
        confirmSave: true
      },
      delete: {
        deleteButtonContent: '<i class="fa fa-trash" title="Delete"></i>',
        confirmDelete: true
      },
      actions: this.actions !== undefined ? this.actions : {
        add: true,
        edit: true,
        delete: true,
      }
    };
    this.settings.columns = Object.assign({}, this.columns);
  }

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.settings = Object.assign({}, this.settings);
    setTimeout(() => {
      this.cd.detectChanges();
    }, 0);
  }

  onCustom($event) {
    console.log(`Custom event '${ $event.action }' fired on row №: ${ JSON.stringify($event.data) }`);
  }

  onCreate($event) {
    this.createConfirm.emit($event);
  }

  onUpdate($event) {
    this.updateConfirm.emit($event);
  }

  onDelete($event) {
    this.deleteConfirm.emit($event);
  }

  onUserRowSelect($event) {
    this.userRowSelect.emit($event)
  }
}
