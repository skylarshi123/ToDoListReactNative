import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Keyboard,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define types for better code organization and type safety
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Sample initial todos
const initialTodos: Todo[] = [
  { id: '1', text: 'Learn React Native', completed: false },
  { id: '2', text: 'Build a Todo App', completed: true },
  { id: '3', text: 'Write Documentation', completed: false }
];

export default function Index() {
  // State Management
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  // Todo Management Functions
  const handleAddTodo = () => {
    const trimmedText = newTodoText.trim();
    if (trimmedText === '') {
      Alert.alert('Cannot add empty todo', 'Please enter some text first.');
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: trimmedText,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setNewTodoText('');
    Keyboard.dismiss();
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            setTodos(todos.filter(todo => todo.id !== id));
          },
          style: 'destructive'
        }
      ]
    );
  };

  // UI Components
  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <Pressable 
        onPress={() => handleToggleTodo(item.id)}
        style={styles.todoContent}
      >
        <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
          {item.completed && (
            <Ionicons name="checkmark" size={16} color="white" />
          )}
        </View>
        <Text style={[
          styles.todoText,
          item.completed && styles.todoTextCompleted
        ]}>
          {item.text}
        </Text>
      </Pressable>
      
      <Pressable 
        onPress={() => handleDeleteTodo(item.id)}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed
        ]}
      >
        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Add Todo Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodoText}
          onChangeText={setNewTodoText}
          placeholder="Add a new todo"
          onSubmitEditing={handleAddTodo}
          returnKeyType="done"
          blurOnSubmit={false}
        />
        <Pressable 
          onPress={handleAddTodo}
          disabled={newTodoText.trim() === ''}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
            newTodoText.trim() === '' && styles.addButtonDisabled
          ]}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      {/* Todo Count */}
      <Text style={styles.todoCount}>
        You have {todos.length} todos ({todos.filter(todo => todo.completed).length} completed)
      </Text>
      
      {/* Todo List */}
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F7'
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10
  },
  input: {
    flex: 1,
    padding: Platform.OS === 'ios' ? 15 : 10,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10
  },
  addButtonPressed: {
    opacity: 0.8
  },
  addButtonDisabled: {
    backgroundColor: '#A2A2A2'
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  todoCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10
  },
  list: {
    flex: 1
  },
  listContent: {
    gap: 10
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxChecked: {
    backgroundColor: '#007AFF'
  },
  todoText: {
    fontSize: 16,
    color: '#1C1C1E',
    flex: 1
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#8E8E93'
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10
  },
  deleteButtonPressed: {
    opacity: 0.5
  }
});