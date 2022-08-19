import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import SanarTelemedicine from './SanarTelemedicine';
const { width, height } = Dimensions.get('window');
interface ISanarChat {
    onEndFlow: () => void,
    enable: boolean,
    notification: any
    appointmentId,
    empId
}

const SanarChat = (props: ISanarChat) => {
    const [baseUrl, setBaseUrl] = useState('');
    const { notification } = props;
    useEffect(() => {
        if (props.enable) {
            if (SanarTelemedicine.session) {
                const CHAT_URL = `${SanarTelemedicine.session.chatUrl}/${notification.roomName}/${notification.uid}?token=${SanarTelemedicine.session.token}`;
                setBaseUrl(CHAT_URL);
            }
        }
    })
    const onMessage = event => {
        console.log(baseUrl);
        if ((!event.canGoBack && event.data && event.data.includes('home')) || (event.canGoBack && event.data && event.data.includes('home'))) {
            setBaseUrl('');
            props.onEndFlow();
        }
    }

    if (!props.enable) {
        return (null);
    }
    return (
        <View style={styles.container}>
            <WebView
                source={{
                    uri: baseUrl,
                }}
                style={{ flex: 1 }}
                // incognito
                onMessage={(event) => onMessage(event.nativeEvent)}
                injectedJavaScript={`
                    (function() {
                        function wrap(fn) {
                        return function wrapper() {
                            var res = fn.apply(this, arguments);
                            window.ReactNativeWebView.postMessage(window.location.href);
                            return res;
                        }
                        }
                        history.pushState = wrap(history.pushState);
                        history.replaceState = wrap(history.replaceState);
                        history.go = wrap(history.go);
                        window.addEventListener('popstate', function() {
                            window.ReactNativeWebView.postMessage('navigationStateChange');
                        });
                    })();
                    true;
                `}
            />
        </View>
    );
}

export default SanarChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
    }
});