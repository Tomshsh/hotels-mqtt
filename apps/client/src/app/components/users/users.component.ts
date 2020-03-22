import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
  Input
} from '@angular/core';
import { UsersServices } from '@my-tray/data-services/mytray/services';
import { UserDto } from '@my-tray/api-interfaces';
import { RoutingComponent } from '@my-tray/shared/utilities';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'button-view',
  template: `
    <i class="fa fa-clone" (click)="onClick()">{{ renderValue }}</i>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    this.save.emit(this.rowData);
  }
}

@Component({
  selector: 'my-tray-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
@RoutingComponent()
export class UsersComponent implements OnInit, OnChanges {
  dataSource: UserDto[] | LocalDataSource;
  loading: boolean;
  columns = {
    token: {
      title: 'ID',
      type: 'string'
    },
    username: {
      title: 'Username',
      type: 'string'
    },
    email: {
      title: 'Email',
      type: 'string'
    },
    button: {
      title: '',
      type: 'custom',
      filter: false,
      attr: {
        style: 'display: flex; justify-content: center;'
      },
      renderComponent: ButtonViewComponent,
      onComponentInitFunction(instance) {
        instance.save.subscribe(row => {
          alert(`${row.name} saved!`)
        });
      }
    },
  };

  constructor(private readonly usersService: UsersServices,
              private readonly cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.usersService.getUsers().pipe(
      tap(() => this.loading = true)
    ).subscribe((users: UserDto[]) => {
        this.dataSource = new LocalDataSource(users);
        setTimeout(() => {
          this.cd.detectChanges();
        }, 0);
      },
      (error) => {
        // todo: loggregate errors
      },
      () => {
        this.loading = false;
      });
  }


  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.cd.detectChanges();
    }, 0);
  }
}
