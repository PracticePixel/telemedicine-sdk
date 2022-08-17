import React, { useEffect, useState, useReducer, useContext } from "react";
import { SANAR_EVENT_TYPE, CONNECTION_STATUS } from "../Types";
import { TELECALL, MESSAGE, ACCEPT_CALL, END_CALL, REJECT_CALL } from "../common/constants";
import { VirtualBackgroundSourceType, VirtualBackgroundSource, Color, VirtualBackgroundBlurDegree } from 'react-native-agora';
import SanarTelemedicine from "../SanarTelemedicine";

import SanarContext from './SanarContext';

const SanarProvider = ({ children, enable }) => {
    const initialState = {
        notification: null,
        ringing: false,
        status: CONNECTION_STATUS.DISCONNECTED
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case TELECALL:
                return { ...state, ringing: action.value };
            case MESSAGE:
                return { ...state, notification: action.value };
            case ACCEPT_CALL:
                return { ...state, status: action.value };
            case END_CALL:
                return { ...state, status: action.value };
            default:
                return initialState;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log('Telemedicine init');
        if (enable && store.status == CONNECTION_STATUS.DISCONNECTED) {
            if (SanarTelemedicine.session) {

                SanarTelemedicine.eventListner.on(SANAR_EVENT_TYPE.Connect, () => {
                    console.log('Connected with Sanar');
                });

                SanarTelemedicine.eventListner.on(SANAR_EVENT_TYPE.Disconnect, () => {
                    console.log('disconnected');
                });


                SanarTelemedicine.eventListner.on(SANAR_EVENT_TYPE.Telecall, (e) => {
                    console.log('telecall ', e);
                    dispatch({ type: MESSAGE, value: e });
                    dispatch({ type: TELECALL, value: true });
                });

                SanarTelemedicine.eventListner.on(SANAR_EVENT_TYPE.Message, (e) => {
                    dispatch({ type: MESSAGE, value: e });
                });

                SanarTelemedicine.eventListner.on(SANAR_EVENT_TYPE.ConnectError, () => {
                    console.log('Connect error');
                    dispatch({ type: END_CALL, value: CONNECTION_STATUS.DISCONNECTED });
                    store._engineRef.leaveChannel();
                });

                SanarTelemedicine.eventListner.on('CALL_REJECTED', (e) => {
                    store.resetStore()
                    dispatch({ type: "" });
                    console.log('call disconnected')
                });
            }
        } else {
            console.log(`Connection validation warning`);
        }
    }, [enable]);

    const onDecline = () => {
        SanarTelemedicine.eventListner.emit(REJECT_CALL, JSON.stringify({
            did: SanarTelemedicine.info.did,
            headerToken: decodeURIComponent(SanarTelemedicine.session.token),
            dsid: state.notification?.sid,
            roomName: state.notification?.roomName
        }));
        // dispatch({ type: MESSAGE, value: null });
        dispatch({ type: TELECALL, value: false });
        dispatch({ type: END_CALL, value: CONNECTION_STATUS.DISCONNECTED });
    }

    const onAccept = () => {
        dispatch({ type: TELECALL, value: false });
        dispatch({ type: ACCEPT_CALL, value: CONNECTION_STATUS.CONNECTED });
        SanarTelemedicine.eventListner.emit(ACCEPT_CALL, JSON.stringify({
            did: SanarTelemedicine.info.did,
            headerToken: decodeURIComponent(SanarTelemedicine.session.token),
            dsid: state.notification?.sid,
            roomName: state.notification?.roomName
        }));
    }

    const onEnd = (duration) => {
        SanarTelemedicine.eventListner.emit(REJECT_CALL, JSON.stringify({
            did: SanarTelemedicine.info.did,
            headerToken: decodeURIComponent(SanarTelemedicine.session.token),
            dsid: state.notification?.sid,
            roomName: state.notification?.roomName,
            duration: duration
        }));
        dispatch({ type: END_CALL, value: CONNECTION_STATUS.DISCONNECTED });
        store._engineRef.leaveChannel();
    }

    const _toggleAudio = async (action) => {
        await store._engineRef.setEnableSpeakerphone(action);
    }

    const _toggleVideo = (action) => {
        if (!action) {
            store._engineRef.enableLocalVideo(false)
            store._engineRef.stopPreview()
        } else {
            store._engineRef.enableLocalVideo(true)
            store._engineRef.startPreview()
        }
    }

    const _toggleMute = async (action) => {
        if (!action) {
            await store._engineRef.muteLocalAudioStream(true)
        } else {
            await store._engineRef.muteLocalAudioStream(false)
        }
    }

    const _toggleCamera = (action) => {
        store._engineRef.switchCamera();
    }

    const _toggleWhiteBg = async (action) => {
        let source = new VirtualBackgroundSource({
            backgroundSourceType: VirtualBackgroundSourceType.Color,
            color: new Color(1, 1, 1)
        });

        if (!action) {
            store._engineRef.enableVirtualBackground(true, source);
        } else {
            store._engineRef.enableVirtualBackground(false, source);
        }
    }

    const _toggleBlurBg = (action) => {
        let source = new VirtualBackgroundSource({
            backgroundSourceType: VirtualBackgroundSourceType.Blur,
            blur_degree: VirtualBackgroundBlurDegree.Medium
        });

        if (!action) {
            store._engineRef.enableVirtualBackground(true, source);
        } else {
            store._engineRef.enableVirtualBackground(false, source);
        }
    }

    const [_engine, set_Engine] = useState(null)
    const [_peerIds, _setPeerIds] = useState([])
    const [_intialFrame, set_IntialFrame] = useState(false)
    const [_isPaused, set_IsPaused] = useState(false)
    const [_openChat, set_OpenChat] = useState(false)

    const store = {
        notification: state.notification,
        ringing: state.ringing,
        status: state.status,
        isChatEnabled: _openChat,
        newMessage: false,
        brandLogo: true,

        //:- Engine properties
        _engineRef: _engine,
        _peerIds: _peerIds,
        intialFrame: _intialFrame,
        isPaused: _isPaused,
        //:- Action
        acceptCall: () => {
            onAccept()
        },

        disconnectCall: () => {
            onDecline()
        },

        endCall: (duration) => {
            onEnd(duration)
        },

        setEngineRef: (ref) => {
            set_Engine(ref)
        },

        setPeerIds: (data) => {
            _setPeerIds(data)
        },

        switchFrame: () => {
            set_IntialFrame(!_intialFrame)
        },

        setVideoPaused: (state) => {
            set_IsPaused(state)
        },

        onClickChat: () => {
            set_OpenChat(true)
        },

        resetStore: () => {
            set_OpenChat(false)
            _setPeerIds([])
            set_IntialFrame(false)
            set_IsPaused(false)
        },

        onClickControl: (type, value) => {
            console.log(type, value)
            switch (type) {
                case "CAMERA":
                    _toggleCamera(value)
                    break;
                case "AUDIO":
                    _toggleAudio(value)
                    break;
                case "MUTE":
                    _toggleMute(value)
                    break;
                case "VIDEO":
                    _toggleVideo(value)
                    break;
                case "WHITE_BG":
                    _toggleWhiteBg(value)
                    break;
                case "BLUR_BG":
                    _toggleBlurBg(value)
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <SanarContext.Provider value={store}>
            {children}
        </SanarContext.Provider>
    );
};

export default SanarProvider






