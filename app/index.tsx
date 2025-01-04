import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';

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
  // Initialize state with our test data
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // Render each individual todo item
  const renderTodo = ({ item }: { item: Todo }) => (
    <View>
      <Text>
        {/* Show a checkmark for completed todos */}
        {item.completed ? '✓ ' : '○ '}
        {item.text}
      </Text>
    </View>
  );

  return (
    <View>
      {/* Display number of todos */}
      <Text>You have {todos.length} todos</Text>
      
      {/* List of todos */}
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={item => item.id}
      />
    </View>
  );
}