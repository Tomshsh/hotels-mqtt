import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserDto } from '@my-tray/api-interfaces';
import { LocalDataSource } from 'ng2-smart-table';
import { ButtonViewComponent } from '../../users/users.component';
import { UsersServices } from '@my-tray/data-services/mytray/services';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'my-tray-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnChanges {
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
