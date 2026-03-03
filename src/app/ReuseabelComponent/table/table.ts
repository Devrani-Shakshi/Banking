import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Transaction } from '../../Models/Transaction';
import { TransactionService } from '../../service/transaction';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [ FormsModule , CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit  {

 userId: number = 2; 
  balance: number = 0;
  history: Transaction[] = [];
  
  // Model for the form
  newTx: Transaction = {
    userId: this.userId,
    description: '',
    type: 'Credit',
    amount: 0
  };

  constructor(private txService: TransactionService) {}

private cdr = inject(ChangeDetectorRef);


  ngOnInit() {
    this.refreshData();
     
this.cdr.detectChanges();
  }

  refreshData() {
    this.txService.getBalance(this.userId).subscribe(res => this.balance = res);
    this.txService.getHistory(this.userId).subscribe(res => this.history = res);
  }
}
