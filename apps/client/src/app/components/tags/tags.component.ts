import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TagsService } from '@my-tray/data-services/mytray/services';
import { RoutingComponent } from '@my-tray/shared/utilities';
import { TagDto } from '@my-tray/api-interfaces';
import { TAGS_COLUMNS } from './core/settings';
import { Deferred } from 'ng2-smart-table/lib/lib/helpers';

@Component({
  selector: 'my-tray-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
@RoutingComponent()
export class TagsComponent implements OnInit {
  dataSource: TagDto[];
  loading: boolean;
  columns = TAGS_COLUMNS;

  constructor(
    private readonly tagsService: TagsService,
    private readonly cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.tagsService.getTags().subscribe((tags: TagDto[]) => {
      this.dataSource = tags;
      this.loading = false;

      setTimeout(() => {
        this.cd.detectChanges();
      }, 0);
    });
  }

  onCreateRowConfirm(event: { newData: TagDto, confirm: Deferred}) {
    console.log('::Create row::', event);
    // todo: dismiss if you don't want to save event.confirm.reject();
    // todo: send data to Parse
    event.confirm.resolve();
  }

  onEditRowConfirm(event: { newData: TagDto, confirm: Deferred}) {
    console.log('::Update row::', event);
    // todo: dismiss if you don't want to save event.confirm.reject();
    // todo: send data to Parse
  }

  onDeleteRowConfirm(event: { newData: TagDto, confirm: Deferred}) {
    console.log('::Delete row::', event);
    // todo: dismiss if you don't want to save event.confirm.reject();
    // todo: send data to Parse
  }

  onDuplicateRowConfirm(event: { newData: TagDto, confirm: Deferred}) {
    console.log('::Delete row::', event);
    // todo: dismiss if you don't want to save event.confirm.reject();
    // todo: send data to Parse
  }
}
