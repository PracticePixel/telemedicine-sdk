import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import Container from './components/Container';
import SanarTelemedicine from './SanarTelemedicine';

interface ITelemedicine {
    // url: string,
    onEndFlow: () => void,
    enable: boolean
}

const SanarBooking = ( props: ITelemedicine ) => {
    const [baseUrl, setBaseUrl] = useState('');
    useEffect(() => {
        if(props.enable) {
            if(SanarTelemedicine.session) {
                setBaseUrl(SanarTelemedicine.session.webUrl);
            }
        }
    })
    const onMessage = event => {
        console.log(event);
        // if ((!event.canGoBack && event.url==event.data) || (event.data && event.data.includes('home'))) {
        //     setBaseUrl('');
        //     props.onEndFlow();
        // }
        if ((!event.canGoBack && event.data && event.data.includes('home') )|| (event.canGoBack && event.data && event.data.includes('home'))) {
            setBaseUrl('');
            props.onEndFlow();
        }
    }
    if(!props.enable) {
        return(null);
    }
    return (
        <Container>
            <View style={styles.container}>
                <WebView
                    source={{
                        uri: baseUrl,
                    }}
                    style={styles.container} 
                    incognito
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
        </Container>
    );
}

export default SanarBooking;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        zIndex: 8
        // flex: 1
    }
});