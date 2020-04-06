import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UsersServices } from '@my-tray/data-services/mytray/services';
import { UserDto } from '@my-tray/api-interfaces';
import { RoutingComponent } from '@my-tray/shared/utilities';
import { LocalDataSource } from 'ng2-smart-table';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'my-tray-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
@RoutingComponent()
export class UsersComponent implements OnInit {
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
    }
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
}
