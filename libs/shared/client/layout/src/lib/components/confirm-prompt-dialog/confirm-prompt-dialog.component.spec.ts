import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPromptDialogComponent } from './confirm-prompt-dialog.component';

describe('ConfirmPromptDialogComponent', () => {
  let component: ConfirmPromptDialogComponent;
  let fixture: ComponentFixture<ConfirmPromptDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPromptDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPromptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
