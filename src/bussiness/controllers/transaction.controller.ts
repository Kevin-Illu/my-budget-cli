import { input } from "@inquirer/prompts";
import { TransactionService } from "../services/transaction.service";
import { select, Separator } from "@inquirer/prompts";
import { BussinessEntities } from "@budgetTypes/entities";

class TransactionController {
  constructor(private transactionService: TransactionService) { }

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

    const newTransaction: BussinessEntities.Expense = {
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

    const transactionSelected: BussinessEntities.Expense = await select({
      message: "select the transaction to edit",
      choices: options,
    }).then((t) => JSON.parse(t));

    this.transactionService.deleteTransaction(transactionSelected.id);
  }
}

export default TransactionController;
