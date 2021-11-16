import React, { useRef } from 'react';
import { Animated, Easing } from 'react-native';

import PropTypes from 'prop-types';

export default function SpinningImage(props) {
    const spinValue = useRef(new Animated.Value(0)).current;
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    React.useEffect(() => {
        Animated.timing(spinValue, {
            toValue: 1,
            duration: props.duration,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }, [props.duration, spinValue]);

    return (
        <Animated.Image // Special animatable View
            style={{
                ...props.style,
                transform: [{ rotate: spin }], // Bind opacity to animated value
            }}
            source={props.source}
        />
    );
}

SpinningImage.propTypes = {
    duration: PropTypes.number,
    style: PropTypes.object,
    source: PropTypes.string,
};
