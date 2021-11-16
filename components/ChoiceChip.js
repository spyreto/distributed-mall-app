import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    circleContainer: {
        alignItems: 'center',
        backgroundColor: colors.grayLight,
        borderRadius: 16,
        height: 32,
        justifyContent: 'center',
        marginLeft: 12,
        marginVertical: 6,
    },
    container: {
        flex: 1,
    },
    labelContainer: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    labelText: {
        fontSize: 18,
    },
    valueContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    valueText: {
        fontSize: 14,
        paddingHorizontal: 12,
    },
});

export default function ChoiceChip({
    label, data, onSelctionChange, style,
}) {
    const [selectedValue, setSelectedValue] = useState(false);

    return (
        <View style={{ ...style, ...styles.container }}>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>{label}</Text>
            </View>
            <View style={styles.valueContainer}>
                {data.map((value) => (
                    <View key={value}>
                        <TouchableOpacity
                            style={
                                value === selectedValue
                                    ? [
                                        styles.circleContainer,
                                        { backgroundColor: colors.primary },
                                    ]
                                    : styles.circleContainer
                            }
                            onPress={() => {
                                setSelectedValue(value);
                                onSelctionChange(value);
                            }}
                        >
                            <Text style={styles.valueText}>{value}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
}

ChoiceChip.propTypes = {
    label: PropTypes.string,
    data: PropTypes.object,
    onSelctionChange: PropTypes.func,
    style: PropTypes.object,
};
