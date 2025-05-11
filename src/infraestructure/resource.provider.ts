import LinkedList from "./stores/linked-list.store";
import { Store } from "@budgetTypes/infrastructure";
import { CommandRegistry } from "./command.registry";
import { ApplicationTypes, Commands } from "@budgetTypes/bussiness";
import HistoryManager from "./history.manager";
import { BusinessLogic } from "../consts";
import APPLICATION_COMMANDS = BusinessLogic.APPLICATION_CAPABILITIES;

export default class ResourceProvider {
  /**
   * Is used to persist data and allow CRUD capabilities for
   * the application.
   */
  static store: Store.SyncStore<unknown>;

  /**
   * Registry all the commands that execute business logic
   */
  static commandRegistry: CommandRegistry<Commands.Commands>;

  /**
   * manage the actions of the user and save it to
   * easily handle actions like go forward or go back
   * like a browser navigation ;)
   */
  static historyManager: HistoryManager<ApplicationTypes.ApplicationActions>;

  static {
    this.store = new LinkedList();
    this.commandRegistry = new CommandRegistry();

    // manage the history of the application
    this.historyManager = new HistoryManager(
      APPLICATION_COMMANDS.app.actions.listOptions,
    );

    // Optionally, register commands here:
    // this.commandRegistry.register("expense:add", new AddExpenseCommand());
    // this.commandRegistry.register("expense:edit", new EditExpenseCommand());
    // this.commandRegistry.register("application:exit", new ExitApplicationCommand());
  }

  static getStore<T>(): Store.SyncStore<T> {
    return this.store as Store.SyncStore<T>;
  }

  static getRegistry(): CommandRegistry<Commands.Commands> {
    return this.commandRegistry;
  }

  static getHistoryManager(): HistoryManager<ApplicationTypes.ApplicationActions> {
    return this.historyManager;
  }
}
