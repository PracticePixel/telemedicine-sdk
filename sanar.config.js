const { exec } = require("child_process");

exec("yarn add https://github.com/MarenTech/react-native-sanar-telemedicine-rc.git react-native-agora react-native-webview react-native-svg react-native-gesture-handler react-native-device-info", (error, stdout, stderr) => {
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