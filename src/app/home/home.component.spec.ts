import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { PlayerService } from '../services/player/player.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockPlayerService: jasmine.SpyObj<PlayerService>;
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<DialogComponent>>;
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'afterClosed']);

  beforeEach(async () => {
    mockSnackBar = jasmine.createSpyObj(['openFromComponent']);
    mockMatDialogRef = jasmine.createSpyObj(['afterClosed']);
    mockMatDialogRef.afterClosed.and.returnValue(of({}));
    mockPlayerService = jasmine.createSpyObj([
      'getPlayers',
      'searchPlayer',
      'searchPlayerByHeight',
      'searchPlayerByCountry',
      'searchPlayerByWeight',
      'sortData',
    ]);
    mockPlayerService.getPlayers.and.returnValue(
      of({ data: [], meta: { next_cursor: 0, per_page: 0 } })
    );

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: PlayerService, useValue: mockPlayerService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPagedData method on init', () => {
    spyOn(component, 'getPagedData');
    component.ngOnInit();
    expect(component.getPagedData).toHaveBeenCalled();
  });
});
