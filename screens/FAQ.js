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
            1. Πως πραγματοποιείται η παραλαβή ενός προϊόντος;
                    </Text>
                    <Text style={styles.answerText}>
            Η παραλαβή ενός προϊόντος πραγματοποιείται στο κατάστημα από το
            οποίο έγινε η κράτηση.
                    </Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
            2. Πως πραγματοποιείται η πληρωμή για την αγορά ενός προϊόντος;
                    </Text>
                    <Text style={styles.answerText}>
            Η πληρωμή ενός προϊόντος πραγματοποιείται στο κατάστημα από το οποίο
            έγινε η κράτηση.
                    </Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
            3. Πόσο διαρκεί η κράτηση ενός προϊόντος;
                    </Text>
                    <Text style={styles.answerText}>
            Η κράτηση ενός προϊόντος διαρκεί εως τη λήξη του ωραριου λειτουργίας
            των καταστημάτων.
                    </Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>4. Τι είναι οι Orange Points;</Text>
                    <Text style={styles.answerText}>
            Είναι οι πόντοι που κερδίζετε από την αγορά προϊόντων εντός της
            εφαρμογής
                    </Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
            5. Πόσους Orange Points κερδίζω από την ολοκλήρωση της αγοράς ενός
            προϊόντος;
                    </Text>
                    <Text style={styles.answerText}>
            Για κάθε ένα ευρώ που δαπανάτε σε ολοκληρωμένες αγορές εντός της
            εφαρμογής κερδίζετε έναν Orange Point.
                    </Text>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
            6. Πως μπορώ να εξαργυρώσω τους Orange Points που έχω συλλέξει;
                    </Text>
                    <Text style={styles.answerText}>
            Εφόσον το σύνολο των Orange Points σας επαρκούν, μπορείτε να τους
            χρησιμοποιείτε για την αγορά ενός προϊόντος.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
