import React from 'react';
import {
    StyleSheet, Text, View, ScrollView,
} from 'react-native';

import colors from '../utils/colors';

const styles = StyleSheet.create({
    answerText: {
        color: colors.grayDark,
        fontSize: 16,
        textAlign: 'justify',
    },
    container: {
        flex: 1,
    },
    questionContainer: {
        marginHorizontal: 16,
        marginVertical: 6,
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 6,
        textAlign: 'left',
    },
});

export default function FAQ() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
            1. How is a product received?
                    </Text>
                    <Text style={styles.answerText}>
            The product is picked up at the store from where the reservation was made.
                    </Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
            2. How is the payment made for the purchase of a product?
                    </Text>
                    <Text style={styles.answerText}>
            Payment for a product is made at the store from which the reservation was made.
                    </Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
            3. What is the maximum reservation time of a product?
                    </Text>
                    <Text style={styles.answerText}>
            The reservation of a product lasts until the end of the opening hours of the stores.
                    </Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>4. What are Orange Points?</Text>
                    <Text style={styles.answerText}>
            These are the points you earn from buying products within the application.
                    </Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
            5. How many Orange Points do I earn from completing the purchase of a product?
                    </Text>
                    <Text style={styles.answerText}>
            For every euro you spend on complete purchases within the app you earn an Orange Point.
                    </Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
            6. How can I redeem the Orange Points I have collected?
                    </Text>
                    <Text style={styles.answerText}>
            If you have enough Orange Points, you can use them to buy a product.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
