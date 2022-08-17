import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Dimensions, StyleSheet, Linking, TouchableOpacity, ScrollView, Image, ActivityIndicator, PanResponder, Animated } from 'react-native';
const DefaultUserImg = require('../Images/profile.png')
import PropTypes from 'prop-types'

export default class ProgressiveImage extends React.Component {
    thumbnailAnimated = new Animated.Value(0);
    imageAnimated = new Animated.Value(0);
    handleThumbnailLoad = () => {
        Animated.timing(this.thumbnailAnimated, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    }
    onImageLoad = () => {
        Animated.timing(this.imageAnimated, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    }

    render() {
        const {
            thumbnailSource,
            source,
            style,
            containerStyle,
            resizeMode,
            styleThumb,
            ...props
        } = this.props;
        return (
            <View style={[styles.container, containerStyle]}>
                <Animated.Image
                    {...props}
                    source={thumbnailSource}
                    style={[{ opacity: this.thumbnailAnimated }, style, styleThumb]}
                    onLoad={this.handleThumbnailLoad}
                    blurRadius={1}
                    resizeMode={resizeMode}
                />
                <Animated.Image
                    {...props}
                    source={source}
                    style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
                    onLoad={this.onImageLoad}
                    resizeMode={resizeMode}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    container: {
        // backgroundColor: 'transparent',
    },
});

ProgressiveImage.propTypes = {
    thumbnailSource: PropTypes.any,
    style: PropTypes.object,
    source: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.any
    ]),
    containerStyle: PropTypes.oneOfType([PropTypes.any, PropTypes.array])
}

// Specifies the default values for props:
ProgressiveImage.defaultProps = {
    thumbnailSource: DefaultUserImg,
    source: DefaultUserImg
};
