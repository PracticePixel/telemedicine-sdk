import React, { useContext } from 'react';
import { RtcLocalView, RtcRemoteView, VideoRenderMode } from 'sanar-rtc';
import SanarContext from '../common/SanarContext'

interface IVideoFrames {
    isLocal: boolean,
}

const VideoFrames = (props: IVideoFrames) => {
    const { isLocal } = props
    const { notification, _peerIds } = useContext(SanarContext);

    const LocalFrame = () => {
        return (
            <RtcLocalView.SurfaceView
                style={{ flex: 1, width: '100%', height: '100%' }}
                zOrderOnTop={false}
                channelId={notification.roomName}
                renderMode={VideoRenderMode.Hidden}
            />
        );
    }

    const RemoteFrame = () => {
        return (
            _peerIds.map((peerId, i) => {
                return (
                    <RtcRemoteView.SurfaceView
                        key={i}
                        style={{ flex: 1, width: '100%', height: 600 }}
                        uid={peerId}
                        channelId={notification.roomName}
                        renderMode={VideoRenderMode.Hidden}
                        zOrderMediaOverlay={false}
                    />
                )
            })
        )
    }

    return (
        <>
            {isLocal ? <LocalFrame /> : <RemoteFrame />}
        </>
    )
}



export default VideoFrames;

