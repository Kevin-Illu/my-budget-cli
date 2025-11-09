declare namespace Presentation {

  export interface Presenter {
    displayMenu(): Promise<any>;
    dispatchCommand(command: any): Promise<any>;
  }

  export interface View {
    getUserChoice(): Promise<any>;
  }
  
}