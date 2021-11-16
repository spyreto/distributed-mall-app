import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 6,
    },
    disableButton: {
        backgroundColor: colors.grayLight,
        borderRadius: 6,
    },
    smallTextButton: {
        fontSize: 18,
    },
    textButton: {
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginVertical: 6,
        textAlign: 'center',
    },
});

export default function Button({
    onPress, label, small, enable,
}) {
    return enable !== false ? (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text
                style={[styles.textButton, small ? styles.smallTextButton : {}]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity style={styles.disableButton}>
            <Text
                style={[styles.textButton, small ? styles.smallTextButton : {}]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

Button.propTypes = {
    onPress: PropTypes.func,
    label: PropTypes.string,
    enable: PropTypes.bool,
    small: PropTypes.bool,
};
