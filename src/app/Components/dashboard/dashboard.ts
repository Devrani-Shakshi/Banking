import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth';
import { Actionbutton } from "../../ReuseabelComponent/actionbutton/actionbutton";
import { Table } from "../../ReuseabelComponent/table/table";

@Component({
  selector: 'app-dashboard',
    standalone: true,
  imports: [CommonModule, Actionbutton, Table],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})


export class Dashboard {
 public auth = inject(AuthService); 
 public router = inject(Router);

 
  //  doTransfer() { console.log('Transfer clicked'); }

    doTransfer() { this.router.navigate(['/Transaction']); }
  goToAdmin() { this.router.navigate(['/admin-panel']); }
 
}
