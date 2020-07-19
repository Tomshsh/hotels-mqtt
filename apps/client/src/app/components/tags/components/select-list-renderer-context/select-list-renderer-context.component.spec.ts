import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectListRendererContextComponent } from './select-list-renderer-context.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '@my-tray/shared/utilities/mocks';
import { ProductsListMock } from '../../core/mocks/products.mock';
import { Observable, of } from 'rxjs';
import { ProductDto } from '@my-tray/api-interfaces';
import { ProductService } from '@my-tray/data-services/mytray/services';
import { Cell } from 'ng2-smart-table';


class ProductServiceMock {
  getProducts(): Observable<ProductDto[]> {
    return of(ProductsListMock);
  }
}

describe('SelectListRendererContextComponent', () => {
  let component: SelectListRendererContextComponent;
  let fixture: ComponentFixture<SelectListRendererContextComponent>;
  const productsServiceStub = new ProductServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectListRendererContextComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProductService, useValue: productsServiceStub },
        { provide: 'env', useValue: environment },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectListRendererContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    spyOn(component, 'ngOnDestroy').and.callFake(() => {
    });
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when initialize component', () => {
    beforeEach(() => {
      spyOn(component.productService, 'getProducts').and.returnValue(of(ProductsListMock));
      spyOn(component, 'ngOnInit').and.callThrough();
      component.cell = new Cell('', null, null, null);
    });

    it('should run ngOnInit', () => {
      component.ngOnInit();

      expect(component.selectedItem).not.toBeUndefined();
      expect(component.ngOnInit).toHaveBeenCalledTimes(1);
      expect(component.productService.getProducts).toBeCalledTimes(1);
    });

    it('should be initialized with default select item', () => {
      expect(component.options).toHaveLength(ProductsListMock.length + 1);
      expect(component.options[0]).toEqual({ value: '', title: 'Select Product', price: 0 });
    });

    it('should initialize SELECT with loaded default value', () => {

    });
  });


  describe('when onItemChanged is emitted', () => {

  });
});
