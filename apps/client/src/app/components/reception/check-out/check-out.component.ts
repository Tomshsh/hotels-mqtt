import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserDto } from '@my-tray/api-interfaces';
import { LocalDataSource } from 'ng2-smart-table';
import { UsersServices } from '@my-tray/data-services/mytray/services';

@Component({
  selector: 'my-tray-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  dataSource: UserDto[] | LocalDataSource;

  constructor(private readonly usersService: UsersServices,
              private readonly cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }
}
