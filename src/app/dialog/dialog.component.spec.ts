import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<DialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj(['close']);

    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            player: {
              id: 1,
              first_name: '',
              last_name: '',
              country: '',
              team: '',
              height: '',
              weight: '',
              draft_year: '',
            },
            type: 'create',
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockDialogRef.close.calls.reset();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create playerForm', () => {
    expect(component.playerForm).toBeDefined();
  });

  it('should have required validators', () => {
    const controls = component.playerForm.controls;
    expect(controls['first_name'].hasError('required')).toBe(true);
    expect(controls['last_name'].hasError('required')).toBe(true);
    expect(controls['country'].hasError('required')).toBe(true);
    expect(controls['team'].hasError('required')).toBe(true);
  });

  it('should close dialog on submit when form is valid', () => {
    const controls = component.playerForm.controls;
    controls['first_name'].setValue('John');
    controls['last_name'].setValue('Doe');
    controls['country'].setValue('USA');
    controls['team'].setValue('Team A');
    fixture.detectChanges();
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should not close dialog on submit when form is invalid', () => {
    component.onSubmit();
    expect(component.dialogRef.close).not.toHaveBeenCalled();
  });

  it('should close dialog on cancel button click', () => {
    const cancelButton = fixture.nativeElement.querySelector(
      'button[color="warn"]'
    );
    cancelButton.click();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should display "Create Player" button when type is "create"', () => {
    component.data.type = 'create';
    fixture.detectChanges();
    const createButton =
      fixture.nativeElement.querySelector('button.create-btn');
    expect(createButton.textContent).toContain('Create Player');
  });

  it('should display "Edit Player" button when type is "edit"', () => {
    component.data.type = 'edit';
    fixture.detectChanges();
    const editButton = fixture.nativeElement.querySelector('button.create-btn');
    expect(editButton.textContent).toContain('Edit Player');
  });
});
