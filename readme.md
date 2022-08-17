# react-native-sanar-telemedicine-rc

React Native library for Sanar Telemedicine

### SDK will support the following implementation

- ### [SanarTelemedicine](/doc#sanartelemedicine-)
- ### [SanarRTC](/doc#sanarrtc)
- ### [SanarBooking](/doc#sanarbooking)
- ### [SanarChat](/doc#sanarchat)

## Installation Steps

Create a Sanar config file `sanar.config.js` in your project root directory and copy the snippet

```javascript
'use strict';function a0_0x2386(_0x1bc098,_0x2de957){const 0x218bf1=a0_0x218b();return a0_0x2386=function(_0x238647,_0x285423){_0x238647=_0x238647-0x1d1;let 0x47846d=_0x218bf1[_0x238647];return 0x47846d;},a0_0x2386(_0x1bc098,_0x2de957);}(function(_0xa164c8,_0x599d92){const 0x48a1ce=a0_0x2386,_0x19c0c0=_0xa164c8();while(!![]){try{const 0x3eccd3=parseInt(_0x48a1ce(0x1d8))/0x1*(parseInt(_0x48a1ce(0x1d1))/0x2)+parseInt(_0x48a1ce(0x1d5))/0x3+-parseInt(_0x48a1ce(0x1d7))/0x4*(-parseInt(_0x48a1ce(0x1dd))/0x5)+parseInt(_0x48a1ce(0x1d9))/0x6+-parseInt(_0x48a1ce(0x1df))/0x7+parseInt(_0x48a1ce(0x1d2))/0x8*(-parseInt(_0x48a1ce(0x1dc))/0x9)+-parseInt(_0x48a1ce(0x1d6))/0xa*(parseInt(_0x48a1ce(0x1de))/0xb);if(_0x3eccd3===_0x599d92)break;else 0x19c0c0['push'](_0x19c0c0['shift']());}catch(_0x4ba9c0){_0x19c0c0['push'](_0x19c0c0['shift']());}}}(a0_0x218b,0x7fbe6));function a0_0x218b(){const 0x2b47fa=['7911nfOIrL','4158430QbVlSK','374elKqBy','6078198GHjTho','message','15166lMFcwo','7936IqtdhE','error:\x20','stdout:\x20','972774HlQySL','14610eRMpAW','4kNttcM','43hTABbJ','4987086nYmXJs','log','stderr:\x20'];a0_0x218b=function(){return 0x2b47fa;};return a0_0x218b();}const {exec}=require('child_process');exec('yarn\x20add\x20https://github.com/MarenTech/react-native-sanar-telemedicine-rc.git\x20react-native-agora\x20react-native-webview\x20react-native-svg\x20react-native-gesture-handler\x20react-native-device-info',(_0x754304,_0x5935b3,_0x5715eb)=>{const _0x1b13ea=a0_0x2386;if(_0x754304){console[_0x1b13ea(0x1da)](_0x1b13ea(0x1d3)+_0x754304[_0x1b13ea(0x1e0)]);return;}if(_0x5715eb){console[_0x1b13ea(0x1da)](_0x1b13ea(0x1db)+_0x5715eb);return;}console['log'](_0x1b13ea(0x1d4)+_0x5935b3);});
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


You can see the documentation [here](/doc)


