export interface LoginResponse {
  token: string;
  role: string;
  email: string;
}

export interface User {
  email: string;
  role: string;
}
