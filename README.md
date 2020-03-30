# WebDetox

[![Build Status](https://travis-ci.org/FSou1/WebDetox.svg?branch=master)](https://travis-ci.org/FSou1/WebDetox)

Chrome Extension, TypeScript and Visual Studio Code.

The [extension](https://chrome.google.com/webstore/detail/webdetox/jglmleifkehhcmheadecpeoohaagakio) is available at the Chrome Store.

![image](https://user-images.githubusercontent.com/1132431/77929158-f6c07b00-726e-11ea-8f5a-56ae20a19a0a.png)

Say goodbye to distracting and toxic topics such (e.g. coronav1rus, cov1d, putin). Have anything to add? You're always welcome.

## Contribution

### Prerequisites

* [node + npm](https://nodejs.org/) (Current Version)

### Option

* [Visual Studio Code](https://code.visualstudio.com/)

### Includes the following

* TypeScript
* Webpack
* Jest
* ESLint

### Project Structure

* src/typescript: TypeScript source files
* src/assets: static files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

### Setup

```
npm install
```

### Import as Visual Studio Code project

...

### Build

```
npm run build
```

### Build in watch mode

#### terminal

```
npm run watch
```

#### Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

### Load extension to chrome

Load `dist` directory

### Test
`npx jest` or `npm run test`

## Thanks

Initial codebase by [Chrome Extension TypeScript Starter](https://github.com/chibat/chrome-extension-typescript-starter);

Icons made by Muhammad Haq from [www.freeicons.io](www.freeicons.io);
