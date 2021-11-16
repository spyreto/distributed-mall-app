import React, { useRef } from 'react';
import { Animated } from 'react-native';

import PropTypes from 'prop-types';

export default function FadeInView(props) {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: props.duration,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim, props.duration]);

    return (
        <Animated.View // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim, // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
}

FadeInView.propTypes = {
    style: PropTypes.object,
    duration: PropTypes.number,
    children: PropTypes.object,
};
