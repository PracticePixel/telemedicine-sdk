const { exec } = require("child_process");

exec("yarn add https://github.com/PracticePixel/sanar-telemedicine-sdk.git https://github.com/PracticePixel/sanar-rtc.git react-native-webview react-native-svg react-native-gesture-handler react-native-device-info", (error, stdout, stderr) => {
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