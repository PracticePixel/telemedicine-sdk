# Documentation

### Access Token Generation
SDK `Connect` method to connect with Sanar services.

```javascript
SanarTelemedicine.Connect("your_client_id", "user_info"})
    .then(response => {
        setConnect(response);
    }).catch(e => console.log(e));
```


### SanarTelemedicine : 
Component to connect with Sanar Server

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
Connect | func | yes | - | Accepts cid & user details and generate user info to utilise Sanar telemedicine features


#### Connect 
Parameters

- cid: string
- info : [UserInfo](/doc#userinfo)

### SanarRTC: 
Sanar videocall frames to initiate videocall

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
enable | boolean | true | - | Enable / Disable RTC connection

### SanarBooking:
Telemedicine appointment booking flow
Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
enable | boolean | false | - | To enable / disable telemedicine booking flow
onEndFlow | callback | true | - | To handle enable property on booking finish


### SanarChat:
Telemedicine appointment booking flow
Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
enable | boolean | false | - | To enable / disable telemedicine booking flow
onChatEnd | callback | true | - | To handle chat end event


### UserInfo :
- did : string 
- uid : string 
- first_name : string
- last_name : string 
- dob : string 
- gender : string 
- nationality : string
- phone_code : string 
- phone_no : string
- marital_status : string


