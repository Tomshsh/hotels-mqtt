import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ToggleButtonListComponent } from './toggle-button-list.component';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const MockListItems = [
  { value: 'Empty', color: '#ccc' },
  { value: 'InPlace', color: '#C7F6C7' },
  { value: 'Momentary', color: '#7FB17F' },
  { value: 'Charged', color: '#7F7FFF' },
  { value: 'VacantChange', color: '#FF7F7F' },
  { value: 'Replaced', color: '#FFCC7A' },
];

describe('ToggleButtonListComponent', () => {
  let component: ToggleButtonListComponent;
  let fixture: ComponentFixture<ToggleButtonListComponent>;
  let groupDebugElement: DebugElement;
  let groupInstance: MatButtonToggleGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonToggleModule],
      declarations: [ToggleButtonListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have six buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('mat-button-toggle'));
    expect(buttons).toHaveLength(6);
  });

  it('should verify that ngOnInit() is worked', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  describe('when clicking on toggle-buttons', () => {
    beforeEach(() => {
      groupDebugElement = fixture.debugElement.query(By.directive(MatButtonToggleGroup));
      groupInstance = groupDebugElement.injector.get<MatButtonToggleGroup>(MatButtonToggleGroup);
    });

    it('should allow to toggle buttons', () => {
      expect(groupInstance._buttonToggles.first.checked).toBeFalsy();
      groupInstance._buttonToggles.first._onButtonClick();
      fixture.detectChanges();
      expect(groupInstance._buttonToggles.first.checked).toBeTruthy();
    });

    it('should allow to toggle every button', () => {
      expect(groupInstance._buttonToggles.toArray()).toContainEqual(
        expect.objectContaining({ checked: false })
      );
      groupInstance._buttonToggles.forEach(btn => btn._onButtonClick());
      expect(groupInstance._buttonToggles.toArray()).toContainEqual(
        expect.objectContaining({ checked: true })
      );
    });

    it('should trigger toggleChange when button clicked', () => {
      spyOn(component.toggleChange, 'emit');
      groupInstance._buttonToggles.first._onButtonClick();
      expect(component.toggleChange.emit).toHaveBeenCalled();
    });

    it('should emit when button is clicked', () => {
      spyOn(component.toggleChange, 'emit');
      groupInstance._buttonToggles.first._onButtonClick();
      expect(component.toggleChange.emit)
    });

    it('should trigger onToggleChange when button clicked', () => {
      spyOn(component, 'onToggleChange');
      groupInstance._buttonToggles.first._onButtonClick();
      expect(component.onToggleChange).toHaveBeenCalledTimes(1);
    });

    it('should verify that onClick correct value is returned', fakeAsync(() => {
      component.toggleChange.subscribe((event: MatButtonToggleChange) => {
        expect(event.value).toEqual(MockListItems[0].value);
      });
      groupInstance._buttonToggles.first._onButtonClick();
    }));
  });
});
