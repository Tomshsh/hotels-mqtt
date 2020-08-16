import { Component, OnInit } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { ChoresService } from '@my-tray/data-services/mytray/services';
import { ChoreDto } from '@my-tray/api-interfaces';

@Component({
  selector: 'my-tray-chore-selection',
  templateUrl: './chore-selection.component.html',
  styleUrls: ['./chore-selection.component.css']
})
export class ChoreSelectionComponent extends DefaultEditor implements OnInit, ViewCell {

  constructor(readonly choresService: ChoresService) {
    super();
  }

  dataSource: ChoreDto[];
  entries: ChoreDto[];

  rowData: any;
  value: string | number | any | any[];

  ngOnInit(): void {
    this.choresService.getChores()
      .subscribe(chores => {
        const titles = this.value.map(c => c.title)
        this.entries = this.dataSource = chores.filter(c => !titles.includes(c.title))
      })
    if (this.cell && this.cell.getValue) {
      this.value = this.cell.getValue() === '' ? [] : this.cell.getValue();
      if (this.value.length === 0) {
        this.cell.newValue = this.value;
      }
    }
  }

  onAddProductListItem($event) {
    if (this.cell.newValue instanceof Array) {
      this.cell.newValue.push($event);
    }
    const titles = this.cell.newValue.map(c => c.title)
    this.entries = this.dataSource.filter(c => !titles.includes(c.title))
  }

  onDeleteProductListItem($event) {
    if (this.cell.newValue instanceof Array) {
      this.cell.newValue = $event;
    }
    const titles = $event.map(c => c.title)
    this.entries = this.dataSource.filter(c => !titles.includes(c.title))
  }
}
