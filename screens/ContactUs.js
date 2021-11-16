/* Ιncomplete screen */

import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    SafeAreaView,
    Platform,
    TextInput,
} from 'react-native';

import TextField from '../components/TextField';
import Button from '../components/Button';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.select({ ios: 8, android: 32 }),
    },
    contentContainer: {},
    scroll: {
        backgroundColor: colors.transparent,
    },
    sentButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 24,
    },
    textField: {
        marginLeft: 16,
        marginRight: 16,
    },
    textInput: {
        borderColor: colors.gray,
        borderRadius: 4,
        borderWidth: 1,
        fontSize: 16,
        marginHorizontal: 16,
        textAlignVertical: 'top',
    },
});

export default function ContactUs() {
    const [enable, setEnable] = useState(false);
    const [value, setValue] = useState('');

    function onChangeText(text) {
        if (text === '') {
            setEnable(false);
            setValue('');
        } else {
            setEnable(true);
            setValue(text);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <TextField
                        style={styles.textField}
                        label="Όνομα"
                    />
                    <TextField
                        style={styles.textField}
                        label="Επώνυμο"
                    />
                    <TextField
                        style={styles.textField}
                        label="Email"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.textInput}
                        multiline
                        numberOfLines={5}
                        placeholder="Παρακαλώ συμπληρώστε τα μήνυμα σας....."
                        onChangeText={(text) => onChangeText(text)}
                        value={value}
                    />
                    <View style={styles.sentButton}>
                        <Button label="ΑΠΟΣΤΟΛΗ" small={true} enable={enable} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
