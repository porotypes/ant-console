import { Balance } from './balance';

export class Account {
  id: number;
  state: string;
  type: string;
  status: number;
  list: Balance[];
}
