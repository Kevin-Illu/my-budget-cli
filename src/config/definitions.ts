import TransactionStore from "../adapters/transaction-store.adapter";
import { generateUUID } from "../adapters/uuid.adapter";
import TransactionFactory from "../factories/transaction.factory";
import { TransactionService } from "../services/transaction.service";
import LinkedList from "../stores/linked-list.store";

export const store = new LinkedList<TransactionEntity>();
export const transactionStore = new TransactionStore(store);
export const transactionFactory = new TransactionFactory(generateUUID);

export const transactionService = new TransactionService(
  transactionStore,
  transactionFactory,
);
