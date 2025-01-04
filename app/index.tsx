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
  Platform,
  useColorScheme
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define theme colors - Good practice: Keep theme definitions separate
const theme = {
  light: {
    background: '#F2F2F7',
    card: '#FFFFFF',
    text: '#1C1C1E',
    subText: '#666666',
    primary: '#007AFF',
    border: '#E5E5EA',
    delete: '#FF3B30',
    disabled: '#A2A2A2'
  },
  dark: {
    background: '#1C1C1E',
    card: '#2C2C2E',
    text: '#FFFFFF',
    subText: '#8E8E93',
    primary: '#0A84FF',
    border: '#3A3A3C',
    delete: '#FF453A',
    disabled: '#636366'
  }
};

// Type definitions - Good practice: Define interfaces at the top
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Good practice: Separate constant data
const initialTodos: Todo[] = [
  { id: '1', text: 'Learn React Native', completed: false },
  { id: '2', text: 'Build a Todo App', completed: true },
  { id: '3', text: 'Write Documentation', completed: false }
];

export default function Index() {
  // Hooks at the top - Good practice
  const colorScheme = useColorScheme();
  const colors = theme[colorScheme ?? 'light'];
  
  // State management
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  // Good practice: Separate handlers into clearly named functions
  const handleAddTodo = () => {
    const trimmedText = newTodoText.trim();
    if (trimmedText === '') {
      Alert.alert('Cannot add empty todo', 'Please enter some text first.');
      return;
    }

    setTodos([...todos, {
      id: Date.now().toString(),
      text: trimmedText,
      completed: false
    }]);
    setNewTodoText('');
    Keyboard.dismiss();
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => setTodos(todos.filter(todo => todo.id !== id)),
          style: 'destructive'
        }
      ]
    );
  };

  // Good practice: Separate render logic
  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={[styles.todoItem, { backgroundColor: colors.card }]}>
      <Pressable 
        onPress={() => handleToggleTodo(item.id)}
        style={styles.todoContent}
      >
        <View style={[
          styles.checkbox,
          { borderColor: colors.primary },
          item.completed && { backgroundColor: colors.primary }
        ]}>
          {item.completed && (
            <Ionicons name="checkmark" size={16} color={colors.card} />
          )}
        </View>
        <Text style={[
          styles.todoText,
          { color: colors.text },
          item.completed && { color: colors.subText, textDecorationLine: 'line-through' }
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
        <Ionicons name="trash-outline" size={20} color={colors.delete} />
      </Pressable>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: colors.card,
              color: colors.text
            }
          ]}
          value={newTodoText}
          onChangeText={setNewTodoText}
          placeholder="Add a new todo"
          placeholderTextColor={colors.subText}
          onSubmitEditing={handleAddTodo}
          returnKeyType="done"
          blurOnSubmit={false}
        />
        <Pressable 
          onPress={handleAddTodo}
          disabled={newTodoText.trim() === ''}
          style={({ pressed }) => [
            styles.addButton,
            { backgroundColor: colors.primary },
            pressed && styles.addButtonPressed,
            newTodoText.trim() === '' && { backgroundColor: colors.disabled }
          ]}
        >
          <Text style={[styles.addButtonText, { color: colors.card }]}>Add</Text>
        </Pressable>
      </View>

      <Text style={[styles.todoCount, { color: colors.subText }]}>
        You have {todos.length} todos ({todos.filter(todo => todo.completed).length} completed)
      </Text>
      
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

// Good practice: Use StyleSheet.create for better performance
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10
  },
  input: {
    flex: 1,
    padding: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  addButton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10
  },
  addButtonPressed: {
    opacity: 0.8
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600'
  },
  todoCount: {
    fontSize: 14,
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  todoText: {
    fontSize: 16,
    flex: 1
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10
  },
  deleteButtonPressed: {
    opacity: 0.5
  }
});