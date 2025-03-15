import InfraestructureModule from "../infraestructure/resource.provider";
import LinkedList from "../infraestructure/stores/linked-list.store";

import TransactionStore from "../bussiness/adapters/transaction-store.adapter";
import { generateUUID } from "../bussiness/adapters/uuid.adapter";
import TransactionFactory from "../bussiness/factories/transaction.factory";
import { TransactionService } from "../bussiness/services/transaction.service";
import TransactionController from "../bussiness/controllers/transaction.controller";
import { Expense } from "../types/entities";

// this infraestructure module should be a singleton
// and should be used in all the application for manage errors
// mange state aplication, store data, etc.
export const infraestructure = new InfraestructureModule();

// define the place where the data will be stored
export const store = new LinkedList<Expense>();

// expose ways to interact with the data store
export const transactionStore = new TransactionStore(store);

// expose ways to create new transactions
export const transactionFactory = new TransactionFactory(generateUUID);

export const transactionService: TransactionService = new TransactionService(
  transactionStore,
  transactionFactory,
);

export const transactionController = new TransactionController(
  transactionService,
);
