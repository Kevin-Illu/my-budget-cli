/**
 * ResourceProvider acts as the central application container.
 * It holds shared resources like the store, command registry, and history manager.
 * Use this as a single point of access for core infrastructure tools.
 */

import LinkedList from "./stores/linked-list.store";
import { Store } from "@budgetTypes/infrastructure";
import { CommandRegistry } from "./commands/command.registry";
import { ApplicationTypes, Commands } from "@budgetTypes/bussiness";
import HistoryManager from "./history.manager";
import { BusinessLogic } from "../consts";
import APPLICATION_COMMANDS = BusinessLogic.APPLICATION_CAPABILITIES;
import { CommandBus } from "./commands/command.bus";
import { COMMAND_DEFINITIONS } from "../business/commands";

export default class AppContext {
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
   * Bus to dispatch commands to their respective handlers
   */
  static commandBus: CommandBus<Commands.Commands>;

  /**
   * manage the actions of the user and save it to
   * easily handle actions like go forward or go back
   * like a browser navigation ;)
   */
  static historyManager: HistoryManager<ApplicationTypes.ApplicationActions>;

  static {
    this.store = new LinkedList();
    this.commandRegistry = new CommandRegistry();
    this.commandBus = new CommandBus(this.commandRegistry);

    // manage the history of the application
    this.historyManager = new HistoryManager(
      APPLICATION_COMMANDS.app.actions.listOptions,
    );

    // Seed some initial data into the store for testing/demo purposes
    const expenses = [
      { date: '2025-11-08', category: 'Food', amount: 25.50, description: 'Lunch with friends' },
      { date: '2025-11-07', category: 'Transport', amount: 12.00, description: 'Bus ticket' },
      { date: '2025-11-06', category: 'Utilities', amount: 60.00, description: 'Electricity bill' },
    ];

    this.store.bullk(expenses);

    // Register all commands in the command registry
    for (const [commandName, commandClass] of Object.entries(COMMAND_DEFINITIONS)) {
      this.commandRegistry.register(
        commandName as Commands.Commands,
        new commandClass()
      );
    }
  }

  // TODO: Implement (Init, Configure, Dispose) methods if needed
  // for managing the lifecycle of resources.

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
