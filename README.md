UC React Native App (Typescript)
==================

This project is based on the Mobile Starter Kit for [React Native](https://facebook.github.io/react-native/) + [NativeBase](http://nativebase.io/) + [Redux](http://redux.js.org) + [CodePush](https://github.com/Microsoft/react-native-code-push) + [TypeScript](https://www.typescriptlang.org/) Apps (iOS & Android).

### Getting Started

Clone or fork this repository:

```sh
git clone https://github.com/xmlking/react-native-mobile-starter-kit.git
cd react-native-mobile-starter-kit
```

Install dependencies (one time only):

```sh
yarn
react-native link
```

Also please note, you need to install the Facebook SDK. You can get it from here: 
https://developers.facebook.com/docs/ios/getting-started/#download - The SDK is a ZIP file 
that must be installed into `~/Documents/FacebookSDK`.


Build the source-code with TypeScript:

```sh
# Build once
yarn run build

# Build and watch for changes
yarn run watch
```

You can also build using `tsc -p src` from the project folder.

Start React Native Server:

```sh
yarn start
```

### Debug
http://localhost:8081/debugger-ui
```
react-native log-ios
react-native log-android
```

### Test 

### Run 

#### iOS Simulator

```sh
yarn run ios
```

Reload code: 
1. `yarn run build` to rebuild the typescript code (or `tsc -p src` from the root directory of the repo)
	```sh
	react-native upgrade
	react-native link
	```
2. `yarn run bundle-android` to generate and copy bundle file to android target.
3. Open this project with Android studio and upgrade target SDK version in builde.gradle file for app and react-native-fbsdk
	`targetSDKVersion to 25`
	replace `compile 'com.android.support:appcompat-v7:25.3.1'`

4. Remove codepush

5. Run app with Android studio
