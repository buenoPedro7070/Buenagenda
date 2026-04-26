import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  ScrollView, 
  Pressable 
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Compromisso 1', completed: false },
    { id: 2, text: 'Compromisso 2', completed: false },
    { id: 3, text: 'Compromisso 3', completed: false },
    { id: 4, text: 'Compromisso 4', completed: false },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buenagenda</Text>
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.section}>
        <Text style={styles.sectionTitle}>Compromissos de hoje</Text>
        
        {tasks.map((task) => (
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
        ))}
      </ScrollView>

      {/* Modal para adicionar nova tarefa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Nova Tarefa</Text>
            
            <TextInput
              style={styles.input}
              placeholder="O que você precisa fazer?"
              value={newTaskText}
              onChangeText={setNewTaskText}
              autoFocus={true}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.button, styles.buttonCancel]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonTextCancel}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.buttonSave]} 
                onPress={addTask}
              >
                <Text style={styles.buttonTextSave}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Botão Flutuante (FAB) */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 10,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Espaço para não cobrir o último item com o FAB
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
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
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#26550b',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f1f3f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonCancel: {
    backgroundColor: '#e9ecef',
  },
  buttonSave: {
    backgroundColor: '#26550b',
  },
  buttonTextCancel: {
    color: '#495057',
    fontWeight: 'bold',
  },
  buttonTextSave: {
    color: 'white',
    fontWeight: 'bold',
  },
});
