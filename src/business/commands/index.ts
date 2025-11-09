import { BusinessLogic } from '../../consts'
import { GetExpensesCommand } from './expenses.commands';
const EXPENSES_COMMANDS = BusinessLogic.APPLICATION_CAPABILITIES.business.expenses;

export const COMMAND_DEFINITIONS = {
  [EXPENSES_COMMANDS.actions.add]: GetExpensesCommand
}