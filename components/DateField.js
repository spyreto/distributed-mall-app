import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, Platform,
} from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';

import colors from '../utils/colors';
import methods from '../utils/methods';

const styles = StyleSheet.create({
    calendarButton: {},
    container: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 8,
    },
    dateFieldContainer: {
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        color: colors.primary,
        height: 24,
        marginRight: 12,
        width: 24,
    },
    labelText: {
        fontSize: 16,
        paddingBottom: 16,
        paddingLeft: 12,
    },
    labelTextUp: {
        color: colors.gray,
        fontSize: 12,
        paddingLeft: 12,
    },
});

export default function DateField({
    onChangeDate,
    style,
    label,
    icon,
    initialValue,
}) {
    const [onFocus, setOnFocus] = useState(false);
    const [date, setDate] = useState(initialValue);
    const [showDate, setShowDate] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
        setOnFocus(false);

        onChangeDate(selectedDate);
    };

    const showDatepicker = () => {
        setShowDate(true);
        setOnFocus(true);
    };

    return (
        /* eslint-disable react-native/no-inline-styles */
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
            <View
                style={
                    onFocus
                        ? [styles.dateFieldContainer, { borderColor: colors.primary }]
                        : [styles.dateFieldContainer, { borderColor: colors.gray }]
                }
            >
                <View style={{ flexDirection: 'column' }}>
                    {date && <Text style={styles.labelTextUp}>{label} </Text>}
                    <Text
                        style={
                            date
                                ? styles.labelText
                                : [styles.labelText, { paddingTop: 16, color: colors.gray }]
                        }
                    >
                        {date ? methods.getJSDatetToString(date) : label}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.calendarButton}
                    onPress={showDatepicker}
                    onBlur={() => setOnFocus(false)}
                >
                    <Icon
                        name="calendar-plus"
                        size={24}
                        style={
                            onFocus
                                ? [styles.icon, { color: colors.primary }]
                                : [styles.icon, { color: colors.gray }]
                        }
                    />
                </TouchableOpacity>
            </View>
            {showDate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={new Date(initialValue)}
                    maximumDate={new Date()}
                    minimumDate={new Date('1900-01-01')}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
}

DateField.propTypes = {
    onChangeDate: PropTypes.func,
    style: PropTypes.object,
    label: PropTypes.string,
    icon: PropTypes.object,
    initialValue: PropTypes.object,
};
