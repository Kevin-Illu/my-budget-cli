import { transactionController } from "./config/definitions";
import TransactionController from "./controllers/transaction.controller";

class Application {
  constructor(private tController: TransactionController) {}

  start() {
    this.tController.startBudgetPresenter();
  }
}

new Application(transactionController).start();
