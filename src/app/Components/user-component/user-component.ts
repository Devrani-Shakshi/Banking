



import { Component } from '@angular/core';
import { TransactionService } from '../../service/transaction';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-user-component',
    standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css',
})

export class UserComponent {
  userId: number = 2; 
  loanAmount: number = 1000;
  tenureMonths: number = 12;
  interestRate: number = 5.5; // 5.5% Interest
  isAgreed: boolean = false;

  constructor(private txService: TransactionService) {}

  // Live Calculator for Monthly EMI
  get monthlyPayment(): number {
    const totalWithInterest = this.loanAmount + (this.loanAmount * (this.interestRate / 100));
    return totalWithInterest / this.tenureMonths;
  }

  async confirmLoan() {
    if (!this.isAgreed) {
      Swal.fire('Wait!', 'Please accept the Terms & Conditions first.', 'warning');
      return;
    }

    const result = await Swal.fire({
      title: 'Confirm Loan Application',
      html: `You are applying for <b>$${this.loanAmount.toLocaleString()}</b><br>
             Monthly Payment: <b>$${this.monthlyPayment.toFixed(2)}</b>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve it!',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33'
    });

    if (result.isConfirmed) {
      this.apply();
    }
  }

  private apply() {
    Swal.showLoading();
    this.txService.applyLoan(this.userId, this.loanAmount).subscribe({
      next: () => {
        Swal.fire('Success!', 'The loan has been credited to your account instantly.', 'success');
        this.loanAmount = 0;
      },
      error: (err) => Swal.fire('Error', err.error || 'System busy. Try again later.', 'error')
    });
  }
}
