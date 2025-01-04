import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the structure of a Todo item
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Initial todos for testing
const initialTodos: Todo[] = [
  {
    id: '1',
    text: 'Learn React Native',
    completed: false
  },
  {
    id: '2',
    text: 'Build a Todo App',
    completed: true
  },
  {
    id: '3',
    text: 'Write Documentation',
    completed: false
  }
];

export default function Index() {
  // State for todos list
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  // State for the new todo input
  const [newTodoText, setNewTodoText] = useState('');

  // Handle adding a new todo
  const handleAddTodo = () => {
    // Don't add empty todos
    if (newTodoText.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false
    };

    setTodos([...todos, newTodo]);
    setNewTodoText(''); // Clear the input after adding
  };

  // Handle toggling a todo's completed status
  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Render each individual todo item
  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Pressable 
        onPress={() => handleToggleTodo(item.id)}
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
      >
        <Text>
          {item.completed ? '✓ ' : '○ '}
          {item.text}
        </Text>
      </Pressable>
      
      <Pressable onPress={() => handleDeleteTodo(item.id)}>
        <Ionicons name="trash-outline" size={20} />
      </Pressable>
    </View>
  );

  return (
    <View>
      {/* Add todo section */}
      <View>
        <TextInput
          value={newTodoText}
          onChangeText={setNewTodoText}
          placeholder="Add a new todo"
          onSubmitEditing={handleAddTodo}
          returnKeyType="done"
        />
        <Button 
          title="Add Todo" 
          onPress={handleAddTodo}
          disabled={newTodoText.trim() === ''}
        />
      </View>

      {/* Display number of todos */}
      <Text>You have {todos.length} todos ({todos.filter(todo => todo.completed).length} completed)</Text>
      
      {/* List of todos */}
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={item => item.id}
      />
    </View>
  );
}