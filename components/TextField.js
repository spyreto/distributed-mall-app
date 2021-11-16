import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';

import { OutlinedTextField } from 'react-native-material-textfield';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 8,
    },
    icon: {
        height: 24,
        marginRight: 12,
        width: 24,
    },
    textFieldContainer: {
        flex: 1,
    },
});

export default function TextField({
    onPress,
    onChangeText,
    style,
    label,
    icon,
    keyboardType,
    data,
    secureTextEntry,
    disabled,
    initialValue,
    validation,
}) {
    const [onFocus, setOnFocus] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const onFocusPress = () => {
        setOnFocus(true);
        if (onPress) {
            onPress();
        }
    };

    const handleOnChangeText = (payload) => {
        if (validation !== undefined) {
            let error = false;
            const validationMsg = validation(payload);
            if (validationMsg !== null) {
                (error = true);
            }
            setErrorMsg(validationMsg);
            onChangeText(payload, error);
        } else {
            onChangeText(payload);
        }
    };

    return (
        <View style={{ ...style, ...styles.container }}>
            {icon && (
                <Icon
                    name={icon}
                    size={24}
                    style={
                        onFocus
                            ? [styles.icon, { color: colors.primary }]
                            : [styles.icon, { color: colors.gray }]
                    }
                />
            )}
            <View style={styles.textFieldContainer}>
                <OutlinedTextField
                    label={label}
                    placeholder={data}
                    placeholderTextColor={colors.grayDark}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    baseColor={colors.gray}
                    tintColor={colors.primary}
                    onFocus={onFocusPress}
                    onBlur={() => setOnFocus(false)}
                    onChangeText={handleOnChangeText}
                    disabled={disabled}
                    value={initialValue}
                    error={errorMsg}
                />
            </View>
        </View>
    );
}

TextField.propTypes = {
    onPress: PropTypes.func,
    onChangeText: PropTypes.func,
    style: PropTypes.object,
    label: PropTypes.string,
    icon: PropTypes.string,
    keyboardType: PropTypes.string,
    data: PropTypes.object,
    secureTextEntry: PropTypes.string,
    disabled: PropTypes.bool,
    initialValue: PropTypes.string,
    validation: PropTypes.func,
};
