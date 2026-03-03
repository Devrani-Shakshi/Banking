

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transaction } from '../Models/Transaction';



@Injectable({ providedIn: 'root' })
export class TransactionService {
  // FIX 1: Removed leading slash to prevent 'api//Transactions'
  private baseUrl = `${environment.apiUrl}/Transactions`; 

  constructor(private http: HttpClient) {}

  // Get balance for a specific user
  getBalance(userId: number): Observable<number> {
    // FIX 2: Changed /Users/ to /User/ to match C# [HttpGet("User/{userId}/Balance")]
    return this.http.get<number>(`${this.baseUrl}/User/${userId}/Balance`);
  }

  // Create a new Credit or Debit
  postTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, transaction);
  }

  // Get transaction history
  getHistory(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/User/${userId}`);
  }


  // src/app/service/transaction.ts

applyLoan(userId: number, amount: number): Observable<Transaction> {
  const loanData: Transaction = {
    userId: userId,
    amount: amount,
    type: 'Credit',
    description: 'Personal Loan Approved'
  };
  return this.http.post<Transaction>(this.baseUrl, loanData);
}

}
