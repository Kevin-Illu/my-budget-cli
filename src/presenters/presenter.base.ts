import { ApplicationTypes } from "@budgetTypes/bussiness";
import ResourceProvider from "../infraestructure/resource.provider";
import { BusinessLogic } from "../consts";
import APPLICATION_COMMANDS = BusinessLogic.APPLICATION_CAPABILITIES;

export default abstract class PresenterBase {
  public resolveHistoryCommand(
    commandHistory: ApplicationTypes.ApplicationHistoryActions,
  ) {
    if (commandHistory === APPLICATION_COMMANDS.app.history.actions.goBack) {
      ResourceProvider.getHistoryManager().back();
      return ResourceProvider.getHistoryManager().getCurrent();
    }

    // go forward
    ResourceProvider.getHistoryManager().forward();
    return ResourceProvider.getHistoryManager().getCurrent();
  };
}
