import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { APP_INITIALIZER, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RoomDataService } from '@my-tray/data-services/mytray/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthSessionQuery } from '@my-tray/shared/client/auth';
import { environment } from '@my-tray/shared/utilities/mocks';
import { of } from 'rxjs';
import { RoomDto } from '@my-tray/api-interfaces';
import { ConfigurationService } from '@my-tray/shared/utilities';

const mockData = [{ floor: 1, num: 10, name: 'Some room', isUtility: false, isOccupied: true, objectId: 'somevalue' }];
const newRoomMock: RoomDto = {
  objectId: 'someid-new-data',
  isOccupied: false,
  isUtility: true,
  name: 'New Room',
  num: 9129,
  floor: 1
};

class ConfirmMock {
  constructor() {
  }

  promise: Promise<any>;
  resolve: any;
  reject: any;
}

export function initConfig(configurationService: ConfigurationService) {
  return () => configurationService.initializeConfiguration(environment);
}

const baseUrl = 'https://hotelapi.3pi-solutions.com/api/';


describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;
  let service: RoomDataService;
  let dialogService: NbDialogService;
  let toastrService: NbToastrService;


  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RoomsComponent],
      providers: [
        RoomDataService,
        ConfigurationService,
        { provide: NbDialogService, useValue: {} },
        { provide: NbToastrService, useValue: {} },
        ChangeDetectorRef,
        AuthSessionQuery,
        { provide: 'env', useValue: environment },
        { provide: APP_INITIALIZER, useFactory: initConfig, deps: [ConfigurationService], multi: true },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    service = TestBed.inject(RoomDataService);
    dialogService = TestBed.inject(NbDialogService);
    toastrService = TestBed.inject(NbToastrService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when loading rooms', () => {
    it('should load a list of rooms', fakeAsync(() => {
      spyOn(service, 'getRooms').and.returnValues(of(mockData));
      component.ngOnInit();
      tick(10);
      expect(component.dataSource).toEqual(mockData);
    }));

    it('should ensure that service called only once on ngOnInit()', () => {
      spyOn(service, 'getRooms').and.callThrough();
      component.ngOnInit();
      expect(service.getRooms).toHaveBeenCalled();
    });
  });

  describe('when creating room', () => {
    const confirmMock = new ConfirmMock();

    it('should create room from view', () => {
      // component.onCreateRowConfirm({ newData: newRoomMock, confirm: confirmMock });
    });

    /* let httpTestingController: HttpTestingController;
    beforeEach(() => {
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should not immediately connect to the server', () => {
      httpTestingController.expectNone({});
    });*/
    /* it('should create room',() => {
       service.create(newRoomMock).subscribe((createdModel: RoomDto) => {
         expect(createdModel.objectId).toEqual('someid-new-data');
       });
       const req: TestRequest = httpTestingController.expectOne(`${baseUrl}classes/Room`);
       expect(req.request.method).toEqual('POST');

       const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newRoomMock });
       req.event(expectedResponse);

       req.flush(newRoomMock);
     });*/

    /*afterEach(() => {
      httpTestingController.verify();
    });*/
  });
});


