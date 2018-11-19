export class Order {
  id: number;
  state: string;
  type: string;
  // status: number;
  accountId: number;
  amount: number;
  canceledAt: number;
  createdAt: number;
  fieldAmount: string;
  fieldCashAmount: number;
  fieldFees: number;
  finishedAt: number;
  price: number;
  source: string;
  symbol: string;
}
