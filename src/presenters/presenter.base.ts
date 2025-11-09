import { ApplicationTypes } from "@budgetTypes/bussiness";
import AppContext from "../infraestructure/app.context";
import { BusinessLogic } from "../consts";
import APPLICATION_COMMANDS = BusinessLogic.APPLICATION_CAPABILITIES;

export default abstract class PresenterBase {
  public resolveHistoryCommand(
    commandHistory: ApplicationTypes.ApplicationHistoryActions,
  ) {
    if (commandHistory === APPLICATION_COMMANDS.app.history.actions.goBack) {
      AppContext.getHistoryManager().back();
      return AppContext.getHistoryManager().getCurrent();
    }

    // go forward
    AppContext.getHistoryManager().forward();
    return AppContext.getHistoryManager().getCurrent();
  };
}
