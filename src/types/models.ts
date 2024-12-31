interface TransactionEntity {
  id: number;
  amount: number;
  category: string;
  date: Date;
}

interface UserTransaction extends Omit<TransactionEntity, "id" | "date"> {}
