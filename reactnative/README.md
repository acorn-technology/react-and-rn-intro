# rn-tutorial-instagram-clone

Made with Expo & Web Firebase SDK
Original Tutorial: https://blog.expo.io/instagram-clone-using-firebase-react-native-expo-cc32f61c7bba

Forked from code at https://github.com/EvanBacon/firebase-instagram.git. Thanks!

## Getting Started

### Prerequisites

[node + npm](https://www.npmjs.com/)
[yarn](https://yarnpkg.com/lang/en/)
[expo](https://expo.io/)

### Download with:

```sh
git clone https://github.com/appsupport-at-acorn/react-and-rn-intro --recursive

cd react-and-rn-intro/reactnative
```

### Install Libs:

```sh
yarn
```


### Run with:

```sh
exp start
```

#### IOS

Open another window, then:
```sh
exp ios
```

#### Android

Open another window, then:

```sh
sh adbreverse.sh
exp android
```

## Setup flow

nano .babelrc

```json
{
  "presets": ["react-native"]
}
```

apm install nuclide
yarn add --dev flow-bin
yarn run flow init
yarn add --dev babel-cli babel-preset-react-native

Install flowtype to atom via Atom-->Preferences-->+Install-->flow-ide (by flowtype)
https://atom.io/packages/ide-flowtype
