// TODO:
// implement the respective clases for the view and do the adapters
// also handle more functionalities
// manage errors correctly u.u
//
//
// btw this works correctly and do all the CRUD ;D

import { input } from "@inquirer/prompts";
import { TransactionService } from "../services/transaction.service";
import { select, Separator } from "@inquirer/prompts";
import { Expense } from "@budgetTypes/entities";

class TransactionController {
  actions = {
    add: async () => {
      await this.handleCreationNewTransaction();
    },
    edit: async () => {
      await this.editTheAmountOfTransaction();
    },
    delete: async () => {
      await this.deleteTransaction();
    },
    list: async () => {
      const count = await this.transactionService.countTransactions();

      if (count >= 1) {
        await this.handleListAllTransactions();
        return;
      }

      console.log("the list are empty");
    },
  };

  constructor(private transactionService: TransactionService) { }

  async startBudgetPresenter() {
    // TODO: why this sometimes crash?
    while (true) {
      const choice = await this.handlingActionChoice();
      if (choice === "exit") {
        return;
      } else {
        await this.actions[choice]();
      }
    }
  }

  async handleListAllTransactions() {
    const transactions = await this.transactionService.getAllTransactions();
    console.table(transactions);
  }

  async handleCreationNewTransaction() {
    const amount = await input({
      message: "enter the amount",
      validate: (amount) => !isNaN(Number(amount)),
    });

    const caztegory = await input({ message: "enter the category" });
    // this.transactionService.createTransaction({
    //   amount: Number(amount),
    //   category,
    // });
  }

  async handlingActionChoice() {
    const answer = await select({
      message: "Your budget",
      choices: [
        {
          name: "Create a new transaction",
          value: "add",
          description: "create a new transaction",
        },
        {
          name: "Edit the amount of transaction",
          value: "edit",
          description: "choose a transaction to edit",
        },
        {
          name: "Delete transaction",
          value: "delete",
          description: "delete an especifyc transactions",
        },
        {
          name: "List of transactions",
          value: "list",
          description: "display all the transactions",
        },
        new Separator(),
        {
          name: "exit",
          value: "exit",
          description: "exit",
        },
      ],
    });
    return answer;
  }

  async editTheAmountOfTransaction() {
    const countOfTransactions =
      await this.transactionService.countTransactions();
    if (countOfTransactions === 0) {
      console.log("the bag is empty");
      return;
    }

    const transactions = await this.transactionService.getAllTransactions();
    const options = transactions.map((t) => ({
      name: `${t.category}: ${t.amount}`,
      value: JSON.stringify(t),
      description: t.date.toString(),
    }));

    const transactionSelected = await select({
      message: "select the transaction to edit",
      choices: options,
    });

    const amount = await input({
      message: "enter the new amount",
      validate: (amount) => !isNaN(Number(amount)),
    });

    const newTransaction: Expense = {
      ...JSON.parse(transactionSelected),
      amount,
    };

    this.transactionService.editAmount(newTransaction);
  }

  async deleteTransaction() {
    const countOfTransactions =
      await this.transactionService.countTransactions();
    if (countOfTransactions === 0) {
      console.log("the bag is empty");
      return;
    }

    const transactions = await this.transactionService.getAllTransactions();
    const options = transactions.map((t) => ({
      name: `${t.category}: ${t.amount}`,
      value: JSON.stringify(t),
      description: t.date.toString(),
    }));

    const transactionSelected: Expense = await select({
      message: "select the transaction to edit",
      choices: options,
    }).then((t) => JSON.parse(t));

    this.transactionService.deleteTransaction(transactionSelected.id);
  }
}

export default TransactionController;
