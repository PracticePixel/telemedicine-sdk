import React, { useState, useContext, useEffect, useCallback } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform, Animated, Image, AppState } from 'react-native'
import SvgIcon from 'react-native-svg-icon'
import svgs from '../common/SanarSVG';
import VideoFrames from './VideoFrames'
import moment from 'moment'
const Icon = (props: any) => <SvgIcon {...props} svgs={svgs} />
const DefaultUserImg = require('../Images/profile.png')
import { G, Path, Svg } from 'react-native-svg';
import colors from '../theme';
/* @ts-ignore */
import { vw, vh } from '../viewport-units'
import SanarContext from '../common/SanarContext'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
let modelHeight = new Animated.Value(0);
var backgroundTime = null;
var callDuration = moment().hour(0).minute(0).second(0).format('H : mm : ss');
interface IControls {
    newMessage: boolean,
    toggleFrame?: () => void,
}

const Controls = (props: IControls) => {
    const { toggleFrame } = props;
    const { notification, newMessage, endCall, brandLogo, intialFrame, isPaused, switchFrame, onClickControl, onClickChat } = useContext(SanarContext);
    const { docProfile, docName } = notification;
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isAudio, setIsAudio] = useState(false);
    const [isCamera, setIsCamera] = useState(false);
    const [isWhite, setIsWhite] = useState(false);
    const [isBlur, setIsBlur] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [isVideo, setIsVideo] = useState(false);

    const updateModel = () => {
        setIsModelOpen(!isModelOpen)
        if (isModelOpen) {
            Animated.timing(
                modelHeight,
                {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false,
                },
            ).start();
        } else {
            Animated.timing(
                modelHeight,
                {
                    toValue: 300,
                    duration: 500,
                    useNativeDriver: false,
                },
            ).start();
        }
    }

    const onClickChatIcon = () => {
        toggleFrame()
        onClickChat()
    }

    const videoFrames = () => {
        let doctorImg = docProfile ? { uri: docProfile } : DefaultUserImg
        var userImage = docProfile ? { uri: docProfile } : DefaultUserImg
        return (
            <TouchableOpacity
                onPress={switchFrame}
                style={styles.videoFrameSwitch}>
                {!intialFrame ? isVideo ? <Image
                    source={doctorImg}
                    style={styles.imageStyle}
                /> :
                    <VideoFrames isLocal={!intialFrame} />
                    :
                    isPaused ? <Image
                        source={userImage}
                        style={styles.imageStyle}
                    /> :
                        <VideoFrames isLocal={!intialFrame} />}
            </TouchableOpacity>
        )
    }

    const controls = (type, value) => {
        switch (type) {
            case "MUTE":
                setIsMute(!isMute)
                onClickControl(type, isMute)
                break;
            case "VIDEO":
                setIsVideo(!isVideo)
                onClickControl(type, isVideo)
                break;
            case "AUDIO":
                setIsAudio(!isAudio)
                onClickControl(type, isAudio)
                break;
            case "CAMERA":
                setIsCamera(!isCamera)
                onClickControl(type, isCamera)
                break;
            case "WHITE_BG":
                setIsWhite(!isWhite)
                onClickControl(type, isWhite)
                break;
            case "BLUR_BG":
                setIsBlur(!isBlur)
                onClickControl(type, isBlur)
                break;
            default:
                break;
        }
    }

    const sideMenuControls = () => {
        const animatedStyle = {
            height: modelHeight,
            opacity: modelHeight.interpolate({
                inputRange: [0, 100, 150, 300],
                outputRange: [0, 0, 0, 1]
            })
        }
        return (
            <Animated.View style={[styles.modelContainer, animatedStyle, { height: modelHeight, backgroundColor: 'rgba(0,0,0, 0.1)', borderRadius: 20, alignItems: 'center' }]}>
                {isModelOpen && <>
                    <TouchableOpacity onPress={() => controls('WHITE_BG', isWhite)} style={styles.frameBorder}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="backgroundWhite" height="25" width="25" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => controls('BLUR_BG', isBlur)} style={styles.frameBorder}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Icon name="backgroundBlur" height="25" width="25" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => controls('CAMERA', isCamera)} style={styles.frameBorder}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {isCamera ? <Icon name="cameraWithFlipIcon" /> : <Icon name="cameraWithoutFlipIcon" />}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => controls('AUDIO', isAudio)} style={styles.frameBorder}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            {isAudio ? <Icon name="speakerDisableIcon" /> : <Icon name="speakerEnableIcon" />}
                        </View>
                    </TouchableOpacity>
                </>}
            </Animated.View>
        )
    }

    const bottomMenuControls = () => {
        return (
            <View style={styles.btnContainer}>
                <View style={styles.btnFirstRow}>
                    <View style={styles.btnRowRight}>
                        <TouchableOpacity onPress={() => controls('MUTE', isMute)} style={styles.microPhoneStyle}>
                            <View style={styles.backgroundChange}></View>
                            {!isMute ? <Icon name="newMicroPhone" height={20} width={20} /> : <Icon name="mutedMicroPhone" height={20} width={20} />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => controls('VIDEO', isVideo)} style={styles.normalBtn}>
                            <View style={styles.backgroundChange}></View>
                            {isVideo ? <Icon name="videoDisableNew" height={20} width={20} /> : <Icon name={"cameraIconNew"} height={20} width={20} />}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnRowLeft}>
                        <TouchableOpacity onPress={() => onClickChatIcon()} style={styles.chatBtn}>
                            <View style={styles.backgroundChange}></View>
                            <Icon name="newVideoChat" height="18" width="23" fill="#FFF" />
                            {newMessage &&
                                <View style={{ backgroundColor: 'red', width: 40, height: 30, position: 'absolute', borderRadius: 20, justifyContent: 'center', alignItems: 'center', top: -18, right: -18 }}>
                                    <Text style={{ color: 'white' }}>new</Text></View>}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.normalBtn} onPress={updateModel}>
                            <View style={styles.backgroundChange}></View>
                            {isModelOpen ? <Icon name={"cancellNew"} height={14} width={14} fill="#FFF" /> : <Icon name={"moreInVideo"} height={20} width={20} />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {brandLogo && <View style={styles.logoContainer}>
                <View style={{ bottom: 0, position: 'absolute' }}>
                    <Icon name={"sanrLogoSvgVideoCall"} height={130} width={130} />
                </View>
            </View>}
            {videoFrames()}
            {isPaused && <View style={styles.pauseTextStyle}>
                <Text style={styles.pausedText} >{'Video Paused'}</Text>
            </View>}
            <View style={styles.timerBox} >
                <Text style={{ color: 'black', fontWeight: '700', fontSize: 16 }}>{docName}</Text>
                <Timer setDuration={(duration) => callDuration = duration} />
            </View>
            <View style={styles.backGroundSvg}>
                <TouchableOpacity onPress={() => endCall(callDuration)} style={[styles.disconnectBtn]}>
                    <Icon name={"callDisconnectSv"} height={25} width={25} />
                </TouchableOpacity>
                <BackGroundSvg color={colors.primaryColor} />
            </View>
            {sideMenuControls()}
            {bottomMenuControls()}
        </View>
    )
}

const BackGroundSvg = (color) => {
    return (
        <Svg viewBox="0 0 375 80" height={150} width={width} >
            <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <G id="Patient-view-Copy-2" transform="translate(0.000000, -682.000000)" fill={color.color}>
                    <G id="Group" transform="translate(0.000000, 674.292312)">
                        <Path d="M0,137.707688 L375,137.707688 L375,0.632737058 L375,7.70768807 C375,18.7533831 366.045695,27.7076881 355,27.7076881 L251.97575,27.7076881 C239.471794,27.7087876 228.279787,35.4652685 223.888413,47.172734 C217.75485,63.5293701 205.536218,71.7076881 187.232515,71.7076881 C168.705898,71.7076881 156.092977,63.3289549 149.393753,46.5714886 C144.839536,35.1792905 133.807492,27.7082653 121.538707,27.7076881 L20,27.7076881 C8.954305,27.7076881 -9.30543353e-15,18.7533831 0,7.70768807 L0,0 L0,0 L0,137.707688 Z" id="bg"></Path>
                    </G>
                </G>
            </G>
        </Svg>
    )
}

const Timer = (props) => {
    const [duration, setDuration] = useState(moment().hour(0).minute(0).second(0).format('H : mm : ss'));
    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (nextAppState == 'background') {
                backgroundTime = moment()
            } else {
                var activeTime = moment()
                var newData = activeTime.diff(backgroundTime, 'seconds')
                if (backgroundTime !== null) {
                    getTime(newData)
                    backgroundTime = null
                }
            }
        });
        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getTime(1)
        }, 1000);
        return () => { clearInterval(interval) };
    }, []);

    const getTime = (val) => {
        Call_Timer = Call_Timer + val;
        var callDuration = moment().hour(0).minute(0).second(Call_Timer).format('H : mm : ss')
        setDuration(callDuration)
        props.setDuration(callDuration)
    }
    return (<Text style={styles.durationTxt}>{duration}</Text>)
}

export default Controls;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: width,
        height: height,
        backgroundColor: 'transparent'

    },
    btnContainer: {
        position: 'absolute',
        bottom: 1 * vw,
        zIndex: 999,
        backgroundColor: 'transparent'
    },
    btnFirstRow: {
        flexDirection: 'row',
        zIndex: 999,
        marginBottom: 30,
        width: '100%',
        justifyContent: 'space-evenly',
        backgroundColor: 'transparent'
    },
    btnRowRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        right: 30,
        alignItems: 'center',
    },
    btnRowLeft: {
        flexDirection: 'row',
        justifyContent: 'center',
        left: 30,
    },
    microPhoneStyle: {
        width: 12 * vw,
        height: 12 * vw,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: colors.primaryColor,
        justifyContent: 'center',
        padding: 5,
        marginRight: 10,
    },
    normalBtn: {
        width: 12 * vw,
        height: 12 * vw,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: colors.primaryColor,
        justifyContent: 'center',
        padding: 5
    },
    chatBtn: {
        width: 12 * vw,
        height: 12 * vw,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: colors.primaryColor,
        justifyContent: 'center',
        padding: 5,
        marginRight: 10
    },
    backGroundSvg: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'transparent'
    },
    logoContainer: {
        width: width,
        height: 100,
        position: 'absolute',
        top: Platform.OS === 'ios' ? 30 : -20,
        left: 20,
    },
    timerBox: {
        flex: 1,
        width: 120,
        zIndex: 999,
        bottom: 110,
        marginLeft: 5,
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    disconnectBtn: {
        backgroundColor: 'red',
        width: 60,
        height: 60,
        zIndex: 999,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        bottom: 65,
        position: 'absolute'
    },
    imageStyle: {
        width: 120,
        height: 160,
        alignSelf: 'center',
        alignItems: 'center',
    },
    frameBorder: {
        width: 48,
        height: 48,
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 0,
        zIndex: 999999999,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modelContainer: {
        width: 60,
        position: 'absolute',
        bottom: 100,
        right: 20,
        marginBottom: 10,
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        overflow: 'hidden',
        zIndex: 999999999
    },
    pausedText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    pauseTextStyle: {
        top: (height / 2) - 25,
        left: (width / 2) - 75,
        width: 150,
        height: 30,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    videoFrameSwitch: {
        width: 120,
        height: 160,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: Platform.OS == 'android' ? 0 : 10,
        overflow: 'hidden',
        position: 'absolute',
        zIndex: 999099999,
        right: 20,
        top: 50
    },
    backgroundChange: {
        width: 12 * vw,
        height: 12 * vw,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#fff',
        opacity: 0.1,
        justifyContent: 'center',
        padding: 5,
        position: 'absolute',
    },
    durationTxt: {
        color: 'black',
        fontWeight: '500',
        fontSize: 13
    }
})

