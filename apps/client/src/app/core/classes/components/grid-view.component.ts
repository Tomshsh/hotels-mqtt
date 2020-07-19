import { OnDestroy, OnInit } from '@angular/core';
import { Deferred } from 'ng2-smart-table/lib/lib/helpers';
import { BaseComponent } from './base.component';

export abstract class BaseGridViewComponent<TModel> extends BaseComponent<TModel> implements OnInit, OnDestroy {
  abstract onCreateRowConfirm(event: { model: TModel, confirm: Deferred })

  abstract onEditRowConfirm(event: { model: TModel, confirm: Deferred });

  abstract onDeleteRowConfirm(event: { model: TModel, confirm: Deferred });
}
