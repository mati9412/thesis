import { LabTest } from './lab-test';
import { Person } from './person';

export interface Order {
  id?: string;
  barcode: string;
  payment: number;
  paymentMethodIsCard: boolean;
  createDate: string;
  person: Person;
  labTests: LabTest[];
}
