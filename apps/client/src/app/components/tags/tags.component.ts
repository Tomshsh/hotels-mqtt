import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TagsService } from '@my-tray/data-services/mytray/services';
import { RoutingComponent } from '@my-tray/shared/utilities';
import { Tag } from '@my-tray/api-interfaces';

@Component({
  selector: 'my-tray-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
@RoutingComponent()
export class TagsComponent implements OnInit {
  dataSource: Tag[];
  loading: boolean;

  columns = {
    objectId: {
      title: 'ID',
      type: 'string'
    },
    expDate: {
      title: 'Expiration Date',
      type: 'string'
    },
    'product.title': {
      title: 'Product Name',
      type: 'string',
      valuePrepareFunction: product => {
        return product.title;
      }
    },
    'product.price': {
      title: 'Price',
      type: 'Number',
      valuePrepareFunction: product => {
        return product.price;
      }
    }
  };

  constructor(
    private readonly tagsService: TagsService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.tagsService.getTags().subscribe((tags: Tag[]) => {
      this.dataSource = tags;
      this.loading = false;

      setTimeout(() => {
        this.cd.detectChanges();
      }, 0);
    });
  }
}
