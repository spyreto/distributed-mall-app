import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    arrowIcon: {
        color: colors.gray,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 8,
    },
    icon: {
        color: colors.gray,
        height: 24,
        marginRight: 32,
        width: 24,
    },
    labelContainer: {
        flexDirection: 'row',
    },
    labelText: {
        color: colors.gray,
        fontSize: 16,
        textAlignVertical: 'center',
    },
});

export default function ArrowButton({
    onPress, label, icon, style,
}) {
    return (
        <TouchableOpacity
            style={{ ...style, ...styles.container }}
            onPress={onPress}
        >
            <View style={styles.labelContainer}>
                {icon && <Icon name={icon} size={24} style={styles.icon} />}
                <Text style={styles.labelText}>{label}</Text>
            </View>
            <Icon name={'chevron-right'} size={24} style={styles.arrowIcon} />
        </TouchableOpacity>
    );
}

ArrowButton.propTypes = {
    onPress: PropTypes.func,
    label: PropTypes.string,
    icon: PropTypes.object,
    style: PropTypes.object,
};
