import { LabTest } from './lab-test';
import { Person } from './person';

export interface Order {
  id?: string;
  barcode: number;
  person: Person;
  labTests: LabTest[];
}
