# Veriff Test Assignment

## Roadmap to get the solution

The solution I've created basically was divided in different goals:

1) Requirements gathering to know which are the functional/non-functional points involved.
2) Select the proper architecture (folder structure) and technologies to solve the problem.
3) Separate and evaluate which are the components I'll use for the implementation.
4) Create the design for the components.
5) Make the functionality for each scenario.
6) Generate the Keyboard Shortcuts.
7) Test that every scenario is covered and make sure every piece matches with the task description.

## Installation, Versions and How to run the project

Node version: 14.15.4
NPM version: 7.24.2

### IMPORTANT: Make sure before running the project to use the versions mentioned before for Node and NPM.

1) Clone project
2) Run command `npm i` to install all the dependencies used in the project.
3) Run command `npm run start` in order to execute the project locally.
4) Go to any browser and open http://localhost:3000/.

## Folder Architecture

```text
├─ public        // Public folder where index.html file lives
├─ src           // Source folder
   ├─ components // Components used along the app       
   ├─ mockApi    // Folder where we have the mocked services working as an API
   ├─ styles     // Styles folder where we'll have the global styles
   ├─ types      // Folder where the types definitions will leave.
   ├─ utils      // Utility folder where we put functions that we'll be used multiple places
```

## Brief solution description

All the logic applied how as well each piece of code is explained in every component with clear comments, so that will be easy
to follow the flow.
