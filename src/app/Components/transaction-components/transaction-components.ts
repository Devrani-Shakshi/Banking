import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../service/transaction';
import { Transaction } from '../../Models/Transaction';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table } from "../../ReuseabelComponent/table/table";

@Component({
  selector: 'app-transaction-components',
  imports: [CommonModule, FormsModule, Table],
  templateUrl: './transaction-components.html',
  styleUrl: './transaction-components.css',
})
export class TransactionComponents implements OnInit  {

 userId: number = 2; // Fixed for demo, usually from Auth service
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

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.txService.getBalance(this.userId).subscribe(res => this.balance = res);
    this.txService.getHistory(this.userId).subscribe(res => this.history = res);
  }

  submitTransaction() {
    this.txService.postTransaction(this.newTx).subscribe({
      next: () => {
        alert('Success!');
        this.refreshData();
        this.newTx.description = '';
        this.newTx.amount = 0;
      },
      error: (err) => alert(err.error || 'Transaction Failed')
    });
  }
}
