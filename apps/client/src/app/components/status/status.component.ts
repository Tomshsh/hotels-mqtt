import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NbDialogService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'my-tray-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<any> = new Subject<any>();

  constructor(private readonly dialogService: NbDialogService,
              private readonly toastrService: NbToastrService,
              private readonly cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  private immidiate() {
    setTimeout(() => {
      this.cd.detectChanges();
    }, 300);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
