import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';

import { ProductService, TagsService } from '@my-tray/data-services/mytray/services';
import { RoutingComponent } from '@my-tray/shared/utilities';
import { TagDto } from '@my-tray/api-interfaces';
import { TAGS_COLUMNS } from './core/settings';

import { Deferred } from 'ng2-smart-table/lib/lib/helpers';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ConfirmPromptDialogComponent } from '@my-tray/shared/layout';
import { NbDialogRef } from '@nebular/theme/components/dialog/dialog-ref';


@Component({
  selector: 'my-tray-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
@RoutingComponent()
export class TagsComponent implements OnInit {
  dataSource: TagDto[];

  loading: boolean;
  columns: any = TAGS_COLUMNS;

  private confirm: NbDialogRef<ConfirmPromptDialogComponent>;
  private confirmOptions = {
    hasBackdrop: true,
    closeOnBackdropClick: false,
    autoFocus: true,
    context: { content: 'Are you sure you want to do this?' }
  };

  constructor(
    private readonly tagsService: TagsService,
    private readonly productService: ProductService,
    private readonly dialogService: NbDialogService,
    private readonly toastrService: NbToastrService,
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

  onCreateRowConfirm(event: { newData: TagDto, confirm: Deferred }) {
    console.log('::Create row::', event);
    // todo: dismiss if you don't want to save event.confirm.reject();
    // todo: send data to Parse
    this.tagsService.createTag(event.newData).subscribe((created: boolean) => {
      if (created) {
        // todo: show toaster after confirmation dialog
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    });
  }

  onEditRowConfirm(event: { newData: any, confirm: Deferred }) {
    console.log('::Update row::', event);

    this.confirm = this.dialogService.open(ConfirmPromptDialogComponent, this.confirmOptions);
    this.confirm.componentRef.instance.onConfirm.subscribe((confirmEvent) => {
      this.tagsService.updateTag({
        objectId: event.newData.objectId,
        expDate: event.newData.expDate,
        productTitle: event.newData.productTitle,
        productPrice: event.newData.productPrice,
        productObjectId: event.newData.productTitle.value,
      }).subscribe((updatedTag: TagDto) => {
        event.confirm.resolve();
        this.confirm.close();
        this.toastrService.success('Successfully update Tag', `Updating Tag`);
        setTimeout(() => {
          this.cd.detectChanges();
        }, 300);
      }, error => {
        this.confirm.close();
        this.toastrService.danger('Failed updating Tag', `Updating Tag`);
      })
    });

    this.confirm.componentRef.instance.onCancel.subscribe((confirmEvent) => {
      event.confirm.reject();
      this.confirm.close();
    });
  }

  onDeleteRowConfirm(event: { data: TagDto, confirm: Deferred }) {
    console.log('::Delete row::', event);
   /* this.tagsService.deleteTag(event.data.objectId).subscribe(() => {
      event.confirm.resolve();
    }, (err) => {
      event.confirm.reject();
    });*/
  }
}
