# LIST OF TODOS IN ORDER TO HAVE FUN :)

this list is a way to have a route map to keep developing this project
and not lost progress?

- ## UI
    - [ ] handle nested menus
      - I need to implement a way to always return the 
      response from the deep menu outside to allow the dispatcher handle that.
    - [ ] read from files the menus
    - [ ] create a better way to create UI
- ## APP
    - [ ] Implement Commands
    - [ ] Implement Configuration files
    - [ ] Read the config from files
- ## BUSINESS
    - [ ] Create a way to interact with Expenses
    - [ ] Define a structure tu build this logic
- ## APP CORE SETTINGS
  - Support Plugins
    - [ ] Build the system to download and load new plugins
    - Load plugins like download the git repo and build it 
    - Then put the built package to the packages directory and register this in the list of
    - packages installed.
    
    - Before that I need to create an isolated function that give the context of the app for the plugins 
    - I see that from a video of Takuya matsuyama with his own App
    - 
    - All of this need to be a separated process
    -
    - Load the installed packages and integrate it
    - 
    - Give them the ability to access to certain parts of the app. 
    - 
    - [ ] Create an architecture to implement the plugins logic
        - [ ] Create a new SQL Lite store as a plugin.