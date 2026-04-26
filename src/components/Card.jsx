import { StyleSheet, View, Text } from "react-native";
import { Checkbox } from "expo-checkbox";

export default function Card({ task, toggleTask }) {
    return (
        <View key={task.id} style={styles.card}>
            <Checkbox
                style={styles.checkbox}
                value={task.completed}
                onValueChange={() => toggleTask(task.id)}
                color={task.completed ? '#26550bff' : undefined}
            />
            <Text style={[styles.cardContent, task.completed && styles.completedText]}>
                {task.text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        // Shadow para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Elevation para Android
        elevation: 3,
    },
    checkbox: {
        marginRight: 15,
        borderRadius: 5,
    },
    cardContent: {
        fontSize: 18,
        color: '#2d2d2d',
        flex: 1,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#adb5bd',
    },
})