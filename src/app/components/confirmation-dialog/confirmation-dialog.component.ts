import { Component, Inject, InjectionToken, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface ConfirmDialogOptions{
  title: string;
  subTitle: string;
  showCancelButton?: boolean;
  cancelButtonTitle?: string;
  buttons: ConfirmDialogButton[];

}

export interface ConfirmDialogButton{
  title: string;
  value: string;
  isLoading?: boolean;
  type?: 'secondary' | 'primary' | 'destructive';
  action?: (button: ConfirmDialogButton, dialog: MatDialogRef<ConfirmationDialogComponent>) => void;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent implements OnInit {
 confirmMessage!: string;
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogOptions) { }

  ngOnInit() {
    this.confirmMessage = this.data.title;
  }

}
