# React/Mineral UI based Zowe Components Catalog

Contains React component loaded at startup which calls the running Zowe Components Catalog to get a list of Zowe Components and displays them in a list.


## Installation

1. Clone the repo

2. run `npm install` inside the repo folder to install all dependencies

3. run `npm run start` to run the live reload server (will automatically open new browser tab on <https://localhost:3000/> where the app runs)


## Building

To build the UI run `npm run build`.

This will generate `build` folder.

You can install a tool called _serve_ (`npm install -g serve`) and then run `serve -s build` to start a static server.
