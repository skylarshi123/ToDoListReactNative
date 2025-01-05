// Import React and necessary components from React Native
import React, { useState } from 'react';
import {
  View,         // A container component, like a div in web
  Text,         // For displaying text
  FlatList,     // Efficient list rendering component
  TextInput,    // Input field for text
  Pressable,    // Touchable component with more flexibility than TouchableOpacity
  StyleSheet,   // For creating optimized style objects
  Alert,        // For showing native alert dialogs
  Keyboard,     // API for controlling keyboard
  Platform,     // API for platform-specific code
  useColorScheme // Hook to detect device theme
} from 'react-native';
// Import Ionicons for icons
import { Ionicons } from '@expo/vector-icons';

// Theme object containing all our color schemes
// We define both light and dark mode colors here
const theme = {
  // Light mode colors
  light: {
    background: '#F2F2F7',  // Light gray background
    card: '#FFFFFF',        // White cards
    text: '#1C1C1E',       // Almost black text
    subText: '#666666',     // Gray text for less important content
    primary: '#007AFF',     // iOS blue for primary actions
    border: '#E5E5EA',      // Light border color
    delete: '#FF3B30',      // iOS red for destructive actions
    disabled: '#A2A2A2'     // Gray for disabled states
  },
  // Dark mode colors
  dark: {
    background: '#1C1C1E',  // Dark background
    card: '#2C2C2E',        // Slightly lighter dark for cards
    text: '#FFFFFF',        // White text
    subText: '#8E8E93',     // Light gray for less important content
    primary: '#0A84FF',     // Brighter blue for dark mode
    border: '#3A3A3C',      // Dark border color
    delete: '#FF453A',      // Brighter red for dark mode
    disabled: '#636366'     // Gray for disabled states
  }
};

// TypeScript interface defining the shape of a Todo item
interface Todo {
  id: string;      // Unique identifier for each todo
  text: string;    // The actual todo text
  completed: boolean; // Whether the todo is completed or not
  deleted: boolean; // Whether the todo is deleted or not
}
//Previous commits ToDo's were deleted permanently, but after talking to my mentor, he suggested I implement soft deletion
//This would allow future development in possibly and undo option

// Initial todos for testing - these will show up when the app first loads
const initialTodos: Todo[] = [
  { id: '1', text: 'Learn React Native', completed: false, deleted: false },
  { id: '2', text: 'Build a Todo App', completed: true, deleted: false },
  { id: '3', text: 'Write Documentation', completed: false, deleted: false }
];

// Main component of our app
export default function Index() {
  // Get the device's color scheme (light/dark) and set default to light if null
  const colorScheme = useColorScheme();
  // Get the appropriate colors based on the color scheme
  const colors = theme[colorScheme ?? 'light'];
  
  // State for managing our list of todos
  // useState is a hook that lets us add state to functional components
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  
  // State for managing the text input for new todos
  const [newTodoText, setNewTodoText] = useState('');

  // Function to handle adding a new todo
  const handleAddTodo = () => {
    // Remove whitespace from beginning and end of input
    const trimmedText = newTodoText.trim();
    
    // Don't add empty todos
    if (trimmedText === '') {
      // Show an alert if the user tries to add an empty todo
      Alert.alert('Cannot add empty todo', 'Please enter some text first.');
      return;
    }

    // Add the new todo to our list
    setTodos([...todos, {
      id: Date.now().toString(), // Use timestamp as a simple unique ID
      text: trimmedText,
      completed: false, // New todos start as not completed
      deleted: false //
    }]);
    
    // Clear the input field
    setNewTodoText('');
    // Hide the keyboard
    Keyboard.dismiss();
  };

  // Function to toggle a todo's completed status
  const handleToggleComplete = (id: string) => {
    // Map through todos and toggle the matched one
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed } // Toggle this todo
        : todo // Leave other todos unchanged
    ));
  };

  // Function to delete a todo
  const handleDeleteTodo = (id: string) => {
    // Show confirmation dialog before deleting
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        // Cancel button
        { text: 'Cancel', style: 'cancel' },
        // Delete button
        {
          text: 'Delete',
          onPress: () => setTodos(todos.map(todo => todo.id === id ? { ...todo, deleted: true }: todo)), // Soft delete
          style: 'destructive' // Makes the button red on iOS
        }
      ]
    );
  };

  // Function to render each todo item
  // This is used by FlatList to render each item in the list
  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={[styles.todoItem, { backgroundColor: colors.card }]}>
      {/* Left side - Checkbox and Text */}
      <Pressable 
        onPress={() => handleToggleComplete(item.id)}
        style={styles.todoContent}
      >
        {/* Custom checkbox */}
        <View style={[
          styles.checkbox,
          { borderColor: colors.primary },
          // Change background color when completed
          item.completed && { backgroundColor: colors.primary }
        ]}>
          {/* Show checkmark when completed */}
          {item.completed && (
            <Ionicons name="checkmark" size={16} color={colors.card} />
          )}
        </View>
        
        {/* Todo text */}
        <Text style={[
          styles.todoText,
          { color: colors.text },
          // Strike through and gray out when completed
          item.completed && { 
            color: colors.subText, 
            textDecorationLine: 'line-through' 
          }
        ]}>
          {item.text}
        </Text>
      </Pressable>
      
      {/* Delete button */}
      <Pressable 
        onPress={() => handleDeleteTodo(item.id)}
        style={({ pressed }) => [
          styles.deleteButton,
          // Show feedback when pressed
          pressed && styles.deleteButtonPressed
        ]}
      >
        <Ionicons name="trash-outline" size={20} color={colors.delete} />
      </Pressable>
    </View>
  );

  // Render non-deleted todos
  const activeTodos = todos.filter(todo => !todo.deleted);

  // Main render
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Input section */}
      <View style={styles.inputContainer}>
        {/* Text input for new todos */}
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
          placeholder="Add a new task"
          placeholderTextColor={colors.subText}
          onSubmitEditing={handleAddTodo} // Handle enter/return key
          returnKeyType="done"
          blurOnSubmit={false} // Don't hide keyboard on submit
        />
        
        {/* Add button */}
        <Pressable 
          onPress={handleAddTodo}
          disabled={newTodoText.trim() === ''} // Disable if input is empty
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

      {/* Todo count text */}
      <Text style={[styles.todoCount, { color: colors.subText }]}>
        You have {todos.length} tasks ({todos.filter(todo => todo.completed && !todo.deleted).length} completed)
      </Text>
      
      {/* List of todos */}
      <FlatList
        data={activeTodos}
        renderItem={renderTodo}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// Styles for our components
const styles = StyleSheet.create({
  container: {
    flex: 1,               // Take up all available space
    padding: 20            // Add padding around all content
  },
  inputContainer: {
    flexDirection: 'row',  // Arrange children horizontally
    marginBottom: 20,      // Space below the input section
    gap: 10               // Space between input and button
  },
  input: {
    flex: 1,              // Take up remaining space
    padding: Platform.OS === 'ios' ? 15 : 10, // Different padding per platform
    borderRadius: 10,     // Rounded corners
    fontSize: 16,         // Text size
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3          // Shadow for Android
  },
  addButton: {
    paddingHorizontal: 20,     // Left/right padding
    justifyContent: 'center',   // Center text vertically
    borderRadius: 10           // Rounded corners
  },
  addButtonPressed: {
    opacity: 0.8              // Slightly transparent when pressed
  },
  addButtonText: {
    fontSize: 16,            // Text size
    fontWeight: '600'        // Semi-bold text
  },
  todoCount: {
    fontSize: 14,           // Smaller text size
    marginBottom: 10        // Space below the count
  },
  list: {
    flex: 1                // Take up remaining space
  },
  listContent: {
    gap: 10               // Space between todo items
  },
  todoItem: {
    flexDirection: 'row',  // Arrange horizontally
    alignItems: 'center',  // Center items vertically
    borderRadius: 10,      // Rounded corners
    padding: 15,           // Internal spacing
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2           // Shadow for Android
  },
  todoContent: {
    flex: 1,              // Take up remaining space
    flexDirection: 'row', // Arrange horizontally
    alignItems: 'center', // Center items vertically
    gap: 10              // Space between checkbox and text
  },
  checkbox: {
    width: 24,            // Fixed size
    height: 24,
    borderRadius: 12,     // Make it circular
    borderWidth: 2,       // Border thickness
    justifyContent: 'center', // Center checkmark
    alignItems: 'center'
  },
  todoText: {
    fontSize: 16,         // Text size
    flex: 1              // Take up remaining space
  },
  deleteButton: {
    padding: 5,           // Touch target padding
    marginLeft: 10        // Space from todo text
  },
  deleteButtonPressed: {
    opacity: 0.5         // More transparent when pressed
  }
});