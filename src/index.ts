import TransactionController from "./bussiness/controllers/transaction.controller";
import { transactionController } from "./config/definitions";

class Application {
  constructor(private tController: TransactionController) { }

  start() {
    this.tController.startBudgetPresenter();
  }
}

new Application(transactionController).start();
