export interface Company {
  id: number;
  name: string;
  status: 'pending' | 'submitted';
  dateAdded: string; // ISO date string
  expirationDate: string; // ISO date string
}
