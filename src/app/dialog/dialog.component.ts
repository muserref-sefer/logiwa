import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../services/player/player.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})

export class DialogComponent {
  playerForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      player: Player,
      type: string
    },
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.playerForm = this.fb.group({
      id: this.data.player.id,
      first_name: ['', Validators.required ],
      last_name: ['', Validators.required ],
      country: ['', Validators.required ],
      team: ['', Validators.required ],
      height: [''],
      weight: [''],
      draft_year: [''],
    });
  }

  onSubmit() {
    if (this.playerForm.valid) {
      this.dialogRef.close(this.data);
    }
  }
}
