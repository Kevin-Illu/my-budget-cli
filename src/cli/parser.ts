import { Command } from "commander";

const program = new Command();

const addExpenseCommand = new Command("expense")
  .description("add a new expense")
  .argument("<amount>", "Expense amount")
  .argument("<name>", "name")
  .action((amount, options) => {
    console.log({ amount, options });
  });

program
  .name("budget-cli")
  .description("mange your buget right on the cli")
  .version("1.0.0");

program.addCommand(addExpenseCommand);
program.parse();
