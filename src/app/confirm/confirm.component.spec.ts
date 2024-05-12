import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmComponent } from './confirm.component';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj(['close']);

    await TestBed.configureTestingModule({
      declarations: [ConfirmComponent],
      imports: [TranslateModule.forRoot(), MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { id: 1, message: 'Test message' },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render confirm button', () => {
    const compiled = fixture.nativeElement;
    const confirmButton = compiled.querySelector('button[color="primary"]');
    expect(confirmButton.textContent).toContain('Confirm');
  });
});
