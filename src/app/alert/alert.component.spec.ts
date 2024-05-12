import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let mockSnackBarRef: jasmine.SpyObj<MatSnackBarRef<AlertComponent>>;

  beforeEach(async () => {
    mockSnackBarRef = jasmine.createSpyObj(['dismissWithAction']);

    await TestBed.configureTestingModule({
      declarations: [AlertComponent],
      imports: [MatSnackBarModule, TranslateModule.forRoot()],
      providers: [
        { provide: MatSnackBarRef, useValue: mockSnackBarRef },
        { provide: MAT_SNACK_BAR_DATA, useValue: 'Test message' },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display message', () => {
    const compiled = fixture.nativeElement;
    const messageElement = compiled.querySelector('.example-pizza-party');
    expect(messageElement.textContent).toContain('Test message');
  });

  it('should dismiss with action', () => {
    const compiled = fixture.nativeElement;
    const dismissButton = compiled.querySelector('button');
    dismissButton.click();
    expect(mockSnackBarRef.dismissWithAction).toHaveBeenCalled();
  });
});
