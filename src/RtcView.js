import React, { Component } from 'react';
import { View } from 'react-native'
import RtcContainer from './components/RtcContainer';
import RtcEngine from 'sanar-rtc';
import VideoFrames from './components/VideoFrames';
import SanarContext from './common/SanarContext';
import Connecting from "./components/Connecting";
import SanarChat from './SanarChat';
export default class RtcView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peerIds: [],
            joined: false,
            connecting: true
        }
        global.Call_Timer = 0;
    }

    static contextType = SanarContext

    componentWillUnmount() {
        const { _engineRef } = this.context
        _engineRef.destroy();
    }

    async componentDidMount() {
        const { notification, setPeerIds, setEngineRef, setVideoPaused } = this.context
        const _engine = await RtcEngine.create(notification.providerId);
        setEngineRef(_engine) //:- Setting engine ref to store

        _engine.enableVideo();
        _engine.addListener('Warning', (warn) => {
            console.log('Warning', warn);
        });

        _engine.addListener('Error', (err) => {
            console.log('Error', err);
        });

        _engine.addListener('RemoteVideoStateChanged', (uid, state, reason, elapsed) => {
            console.log('RemoteVideoStats', uid, state, reason, elapsed);
            if (reason == 5) {
                setVideoPaused(true)
            } else if (reason == 6) {
                setVideoPaused(false)
            }
        });

        _engine.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed);
            // If new user
            if (this.state.peerIds.indexOf(uid) === -1) {
                this.setState({
                    peerIds: [...this.state.peerIds, uid]
                })
                setPeerIds(this.state.peerIds)
            }
            this.setState({ connecting: false })
        });

        _engine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason);
            this.setState({
                peerIds: this.state.peerIds.filter((id) => id !== uid)
            })
            setPeerIds(this.state.peerIds)
        });

        _engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed);
            this.setState({ joined: true });
        });

        setTimeout(() => {
            _engine?.joinChannel(notification.token, notification.roomName, null, 0);
        }, 1000);
    }

    render() {
        const { intialFrame, isChatEnabled, notification } = this.context
        const { joined, connecting } = this.state
        if (joined) {
            return (
                <>
                    <View style={{ flex: 1 }}>
                        {isChatEnabled &&
                            <SanarChat
                                empId={'uid'}
                                appointmentId={'apnt_id'}
                                notification={notification}
                                enable={isChatEnabled}
                                onEndFlow={() => { }}
                            />}
                    </View>
                    <View style={{ position: 'absolute' }}>
                        {connecting ?
                            <Connecting />
                            :
                            <RtcContainer>
                                <VideoFrames isLocal={intialFrame} />
                            </RtcContainer>
                        }
                    </View>
                </>
            );
        } else {
            return null;
        }
    }
}
