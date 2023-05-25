import { LabTest } from './lab-test';
import { Person } from './person';

export interface Order {
  id?: string;
  barcode: number;
  createDate: string;
  person: Person;
  labTests: LabTest[];
}
