export interface User {
  key: string;
  email: string;
  username: string;
  password: string;

  createdAt: number;
  updatedAt: number;
  lastLoggedIn: number;
}
