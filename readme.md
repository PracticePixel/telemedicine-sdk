# react-native-sanar-telemedicine-rc

React Native library for Sanar Telemedicine

### SDK will support the following implementation

- ### [SanarTelemedicine](https://github.com/PracticePixel/sanar-telemedicine-sdk/tree/master/doc#sanartelemedicine-)
- ### [SanarRTC](https://github.com/PracticePixel/sanar-telemedicine-sdk/tree/master/doc#sanarrtc)
- ### [SanarBooking](https://github.com/PracticePixel/sanar-telemedicine-sdk/tree/master/doc#sanarbooking)
- ### [SanarAppointments](https://github.com/PracticePixel/sanar-telemedicine-sdk/tree/master/doc#sanarappointments)

## Installation Steps

#### Option 1

Create a Sanar config file `sanar.config.js` in your project root directory and copy the snippet

```javascript
const { exec } = require("child_process");

exec("yarn add https://github.com/PracticePixel/sanar-telemedicine-sdk.git https://github.com/MarenTech/sanar-rtc.git react-native-webview react-native-svg react-native-gesture-handler react-native-device-info", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
```

In your `package.json` add `sanar:setup` to your script as shown below

```js
   "scripts": {
     "sanar:setup": "node ./sanar.config.js"
   }
```


#### using npm
```shell
npm run sanar:setup
```

#### using yarn
```shell
yarn sanar:setup
```

#### Option 2

Sanar Telemedicine works with below dependencies, run the below command in your project's root terminal 

```
yarn add https://github.com/PracticePixel/sanar-telemedicine-sdk.git https://github.com/PracticePixel/sanar-rtc.git react-native-webview react-native-svg react-native-gesture-handler react-native-device-info
```

### IOS

```shell
cd ios && pod install
```

To enable camera usage and microphone usage you will need to add the following entries to your `Info.plist` file:

```
<key>NSCameraUsageDescription</key>
<string>Your message to user when the camera is accessed for the first time</string>
<key>NSMicrophoneUsageDescription</key>
<string>Your message to user when the microphone is accessed for the first time</string>
```

### Android

To enable camera usage and microphone usage you will need to add camera and audio permissions to your `AndroidManifest.xml` file:

```xml
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />
    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
    <uses-feature android:name="android.hardware.microphone" android:required="false" />
```

```shell
npx jetify
```

### usage
 
 ```javascript
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SanarRTC, { SanarTelemedicine, BookingFlow } from 'react-native-sanar-telemedicine-rc';

const App = () => {
    
    const [connect, setConnect] = useState(false);
    const [bookingFlowStatus, setBookingFlowStatus] = useState(false);

    useEffect(() => {
        SanarTelemedicine.Connect("your_client_id", {uid: "SMU6", did: "abcdefg"})
        .then(response => {
            setConnect(response);
        }).catch(e => console.log(e));
    });

    return (
        <>
            <View style={styles.page}>
                <View style={styles.container}>
                <Text>App content</Text>
                </View>
            </View>
         
         {/* Bookingflow Component */}
         <BookingFlow
            enable={bookingFlowStatus}
            onEndFlow={()=>setBookingFlowStatus(false)} />

         {/* Sanar RTC Component */}
         <SanarRTC enable={connect}>


        </>
    );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'tomato'
  },
  map: {
    flex: 1
  }
});

export default App;

 ```


You can see the documentation [here](https://github.com/PracticePixel/sanar-telemedicine-sdk/tree/master/doc)


