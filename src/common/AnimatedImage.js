import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import ProgressiveImage from '../common/ProgressiveImage';
import colors from '../theme';
const DefaultUserImg = require('../Images/profile.png')
const windowWidth = Dimensions.get('window').width;

const AnimatedImage = (props) => {
    const docProfileImg = props.profileImage
    const docImage = !docProfileImg ? { uri: 'https://static.remove.bg/remove-bg-web/f9c9a2813e0321c04d66062f8cca92aedbefced7/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png' } : DefaultUserImg
    const [animateCircle, setAnimateCircle] = React.useState(true);

    //:- Outer circle
    var outerCirHeight = React.useRef(new Animated.Value(260)).current;
    var outerCirWidth = React.useRef(new Animated.Value(260)).current;
    var outerCirRadius = React.useRef(new Animated.Value(130)).current;

    //:- Inner circle
    var innerCirHeight = React.useRef(new Animated.Value(220)).current;
    var innerCirWidth = React.useRef(new Animated.Value(220)).current;
    var innerCirRadius = React.useRef(new Animated.Value(110)).current;


    const animateOuterCircle = () => {       //:- Outer circle Animation
        var width, height, radius;
        if (animateCircle) {
            width = height = 240;
            radius = 120;
        } else {
            width = height = 300;
            radius = 150;
        }
        Animated.parallel([
            Animated.timing(outerCirHeight, {
                toValue: height,
                duration: 600,
                useNativeDriver: false,
            }),
            Animated.timing(outerCirWidth, {
                toValue: width,
                duration: 600,
                useNativeDriver: false,
            }),
            Animated.timing(outerCirRadius, {
                toValue: radius,
                duration: 600,
                useNativeDriver: false,
            }),
        ]).start(() => {
            animateInnerCircle()
        });
        setAnimateCircle(!animateCircle);
    };

    const animateInnerCircle = () => {      //:- Inner circle Animation
        var width, height, radius;
        if (animateCircle) {
            width = height = 240;
            radius = 120;
        } else {
            width = height = 200;
            radius = 100;
        }
        Animated.parallel([
            Animated.timing(innerCirHeight, {
                toValue: height,
                duration: 600,
                useNativeDriver: false,
            }),
            Animated.timing(innerCirWidth, {
                toValue: width,
                duration: 600,
                useNativeDriver: false,
            }),
            Animated.timing(innerCirRadius, {
                toValue: radius,
                duration: 600,
                useNativeDriver: false,
            }),
        ]).start();
    }

    useEffect(() => {
        const interval = setInterval(() => {
            animateOuterCircle();
        }, 600);
        return () => clearInterval(interval);
    }, [animateCircle]);

    return (
        <View style={styles.container}>
            <View style={styles.proContainer}>
                <Animated.View
                    style={[styles.outerCircle, { width: outerCirWidth, height: outerCirHeight, borderRadius: outerCirRadius }]}>
                    <Animated.View style={[styles.innerCircle, { width: innerCirWidth, height: innerCirHeight, borderRadius: innerCirRadius }]}>
                        <View style={styles.imgBorder}>
                            <ProgressiveImage
                                thumbnailSource={DefaultUserImg}
                                source={docImage}
                                style={styles.proPic}
                                resizeMode={'stretch'}
                            />
                        </View>
                    </Animated.View>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    proContainer: {
        width: windowWidth,
        height: 300,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outerCircle: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: colors.secondryDarkColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 180,
        height: 180,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.secondryLightColor,
    },
    imgBorder: {
        width: 190,
        height: 190,
        borderRadius: 95,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'rgba(211,211,211,0.7)'
    },
    proPic: {
        alignSelf: 'center',
        width: 175,
        height: 175,
        borderRadius: 87.5,
    }
});


export default AnimatedImage;





