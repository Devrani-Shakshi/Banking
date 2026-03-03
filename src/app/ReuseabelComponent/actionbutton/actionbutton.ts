import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-actionbutton',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './actionbutton.html',
  styleUrl: './actionbutton.css',
})
export class Actionbutton {
   @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'primary' | 'outline' | 'admin' | 'danger' = 'primary';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<MouseEvent>();
}
