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
Connect | callback | yes | - | Accepts client_id & user details and generate user info to utilise Sanar telemedicine features


#### Connect()
Connect method properties are listed below 
Parameters

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
cid | string | yes | - | Client Id provided by Sanar
info | [UserInfo](https://github.com/PracticePixel/sanar-telemedicine-sdk/tree/master/doc#userinfo-) | yes | - | User properties to create session with Sanar
lang | string | no | `en` | Language of the application

### SanarRTC : 
Sanar videocall frames to initiate videocall

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
enable | boolean | true | - | Enable / Disable RTC connection

### SanarBooking :
Telemedicine appointment booking flow
Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
enable | boolean | false | - | To enable / disable telemedicine booking flow
onEndFlow | callback | true | - | To handle enable property on booking finish


### SanarAppointments :
Telemedicine appointment list flow
Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
enable | boolean | false | - | To enable / disable telemedicine booking flow
onEndFlow | callback | true | - | To handle enable property on booking finish


### UserInfo :
Property | Description
:--- | :---
first_name : string | User first name
last_name : string  | User last name
dob : string  | dob in `yyyy-mm-dd`
gender : string  | Gender `M` | `F`
nationality : string | Nationality of User ex : Saudi Arabia.
document_id : string | Document id
mid : string | Medgulf id 
document_type: number | Document Type
phone_code : string  | Phone code ex : `966`
phone_no : string | Phone Number
marital_status : string | Marital status `0` : `Unmarried`, `1` : `Married`


