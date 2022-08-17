import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import SanarContext from '../common/SanarContext'
import AnimatedImage from '../common/AnimatedImage';
import SvgIcon from 'react-native-svg-icon';
import svgs from '../common/SanarSVG';
import colors from '../theme';
const Icon = (props) => <SvgIcon {...props} svgs={svgs} />;
const { width, height } = Dimensions.get('window');

const Ringer = () => {
    const { notification, acceptCall, disconnectCall } = useContext(SanarContext);
    const { docName, type, docProfile } = notification;
    return (
        <View style={styles.container}>
            <AnimatedImage profileImage={docProfile} />
            <View style={styles.textContainer}>
                <Text style={styles.doctorName}>{docName || ''}</Text>
                <Text style={styles.callTypeText}>{type || ''}</Text>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => disconnectCall()} style={styles.disconnectBtn} >
                    <Icon name={"callDisconnectSv"} height={28} width={28} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => acceptCall()} style={styles.acceptBtn} >
                    <Icon name={"callAccept"} height={20} width={20} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Ringer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        width: width,
        height: height,
    },
    textContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    btnContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: '12%',
        position: 'absolute',
        bottom: 60,
        width: '100%'
    },
    disconnectBtn: {
        backgroundColor: 'red',
        width: 80,
        height: 80,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    acceptBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1abc9c',
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    doctorName: {
        fontWeight: '700',
        fontSize: 20,
        color: colors.textDarkColor,
    },
    callTypeText: {
        fontSize: 18,
        fontWeight: '400',
        color: colors.textGrayColor,
        marginTop: 10
    }
});