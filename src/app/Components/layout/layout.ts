import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone : true,
  imports: [ RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
   public auth = inject(AuthService);
}
