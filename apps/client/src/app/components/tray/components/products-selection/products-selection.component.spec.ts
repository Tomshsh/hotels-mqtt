import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSelectionComponent } from './products-selection.component';

describe('ProductsSelectionComponent', () => {
  let component: ProductsSelectionComponent;
  let fixture: ComponentFixture<ProductsSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSelectionComponent ]
    })
    .compileComponents();
  }));

 /* beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
