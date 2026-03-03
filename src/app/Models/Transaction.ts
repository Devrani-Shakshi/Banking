export interface Transaction {
  id?: number;
  userId: number;
  description: string;
  type: 'Credit' | 'Debit';
  amount: number;
  transactionDate?: Date;
}