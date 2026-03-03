export interface Users {
  id?: number;
  email: string;
  password?: string; // Optional for updates
  role: string;
  balance: number;
}

