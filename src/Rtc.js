import React from "react";
import { StyleSheet, View } from 'react-native';
import { CONNECTION_STATUS } from "./Types";
import Ringer from "./components/Ringer";
import RtcView from "./RtcView";
import SanarContext from './common/SanarContext'

const Rtc = () => {
    const { ringing, status } = React.useContext(SanarContext);
    if (!ringing && status != CONNECTION_STATUS.CONNECTED) return (null);
    return (
        <View style={styles.container}>
            {ringing && <Ringer />}
            {status == CONNECTION_STATUS.CONNECTED && <RtcView />}
        </View>
    );
};

export default Rtc;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute'
    }
});
