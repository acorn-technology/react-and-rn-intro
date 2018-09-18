---
presentation:
  width: 1440
  height: 1280
  controls: false
---

<!-- slide -->
- Add some new dependencies to support youtube and start rebuilding (could take a few minutes, so build in the background)

1. Using NPM:
```bash
npm install --save react-native-elements
npm install --save react-native-vector-icons
npm install --save youtube-api-search
npm install --save react-native-youtube
react-native link
```

2. Or Using Yarn:
```bash
yarn add react-native-elements --save
yarn add react-native-vector-icons --save
yarn add youtube-api-search --save
yarn add react-native-youtube --save
react-native link
```

3. Or Manually Updating package.json

```json
  "dependencies": {
    "react": "16.5.0",
    "react-native": "0.57.0",
    "react-native-elements": "^0.19.1",
    "react-native-vector-icons": "^5.0.0",
    "react-native-youtube": "^1.1.0",
    "youtube-api-search": "^0.0.5"
  },
```
3.1 Followed by letting npm update modules:
```bash
npm install
react-native link
```
or `yarn`

Finally: `react-native run-ios` or `react-native run-android`
