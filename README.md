# [React](https://reactjs.org/) Advanced Training powered by [devonfw](http://devonfw.com/)

## Getting started

### Install prerequisites

#### Git

Check if you have a Git client already installed:

```
git --version
```

If your OS can not recognize this command, install Git. For details please refer to [this page](http://git-scm.com).
When installing under Windows, please make sure you check the following option:

- Use git from Windows command prompt

#### Node.js

All examples have been implemented using [Node.js](https://nodejs.org/) `12.13.0`.

It is highly recommended to install the [Node Version Manager](https://github.com/creationix/nvm) which manages multiple active
[Node.js](https://nodejs.org/) versions on your machine. The latest windows version of nvm can be downloaded [here](https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-setup.zip).

Having the [Node Version Manager](https://github.com/creationix/nvm) installed, install Node.js:

```
nvm install 12.13.0
```

and set it to be used:

```
nvm use 12.13.0
```

#### yarn

In the workshop we will use [yarn](https://yarnpkg.com/) as package manager. Follow the official intsllation guide to have it ready to use.

### Clone, install dependencies and run

Clone this repository and go to the `00-start` branch:

```
git clone https://github.com/devonfw-react-training/react-advanced.git -b 00-start
```

Install dependencies using [yarn](https://yarnpkg.com/):

```
cd react-advanced
yarn
```

This may take several minutes...

Start the application:

```
yarn start
```

An app that we built during the _foundations_ workshop should open in your default browser.
The simple backend JSON-based server should also be up and running.

### How we boosted the app

In addition to the _foundations_ app we have levareged use of the following elements:

- [Jest](https://jestjs.io/)

- [Testing library/React](https://testing-library.com/docs/react-testing-library/intro)

- [React hooks](https://reactjs.org/docs/hooks-intro.html)

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app (client and server) in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
