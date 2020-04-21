import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-confirm-prompt-dialog',
  template: `
    <nb-card>
      <nb-card-header>Confirm Dialog</nb-card-header>
      <nb-card-body>
        {{ content }}
      </nb-card-body>
      <nb-card-footer>
        <button nbButton style="margin: 0 10px 0 0" status="primary" (click)="confirm($event)">OK</button>
        <button nbButton status="default" (click)="cancel($event)">Cancel</button>
      </nb-card-footer>
    </nb-card>
  `
})
export class ConfirmPromptDialogComponent implements OnInit {
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Input() content: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  confirm($event) {
    this.onConfirm.next($event);
  }

  cancel($event) {
    this.onCancel.emit($event);
  }
}
